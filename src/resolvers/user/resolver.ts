import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Field,
  Ctx,
  ObjectType,
  FieldResolver,
  Root,
} from "type-graphql";
import User from "../../db/entities/user.entity";
import UsernamePasswordInput from "./UsernamePasswordInput";
import { getConnection } from "typeorm";
import bcrypt from "bcrypt";
import { Context } from "koa";
import redisStore from "koa-redis";
import koa from "koa-session";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import { uid } from "rand-token";
import { validateRegister } from "./validateRegister";
import { FieldError } from "../../utils/fieldError";

const FORGET_PASSWORD_PREFIX = "forgotPassword";
const JWT_SECRET = process.env.SESSION_SECRET || "jwt_secret";
const saltRounds = 10;

interface Session extends koa.Session {
  id?: number;
}

export type UserContext = {
  ctx: Context;
  redis: redisStore.RedisSessionStore;
};

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => String, { nullable: true })
  token?: string;
}

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { ctx }: UserContext) {
    if (ctx.session?.id === user.id) {
      return user.email;
    }
    return "";
  }
  // query profile
  @Query(() => User, { nullable: true })
  me(@Ctx() { ctx }: UserContext) {
    // you are not logged in
    if (!ctx.session?.isNew) {
      return null;
    }
    return User.findOne(ctx.session["id"]);
  }

  // refresh token
  @Query(() => UserResponse)
  async refreshToken(
    @Ctx() { ctx }: UserContext
  ): Promise<UserResponse | null> {
    const refresh_token = ctx.cookies.get("refreshToken", { signed: true });
    if (!refresh_token) {
      return {
        errors: [
          {
            field: "refreshToken",
            message: "Invalid Refresh Token",
          },
        ],
      };
    }
    const user = await User.findOne({ where: { refresh_token } });
    if (!user || user.refresh_expires < new Date(Date.now())) {
      return {
        errors: [
          {
            field: "refreshToken",
            message: "Invalid Refresh Token",
          },
        ],
      };
    } else {
      const token = jwt.sign(
        {
          userId: user.id,
          userName: user.username,
          role: user.role_id,
          email: user.email,
        },
        JWT_SECRET,
        { expiresIn: 300 }
      );
      return {
        token,
      };
    }
    return null;
  }
  // account register
  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { ctx }: UserContext
  ): Promise<UserResponse> {
    let user;
    let token;

    // validate user information are corect
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }
    // check email
    const count = await User.count({
      where: {
        email: options.email,
      },
    });
    if (count > 0) {
      return {
        errors: [
          {
            field: "email",
            message: "The email already exists",
          },
        ],
      };
    } else {
      // check username
      const count = await User.count({
        where: {
          username: options.username,
        },
      });
      if (count > 0) {
        return {
          errors: [
            {
              field: "username",
              message: "The username already exists",
            },
          ],
        };
      } else {
        try {
          const salt = bcrypt.genSaltSync(saltRounds);
          const hashedPassword = bcrypt.hashSync(options.password, salt);
          const result = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({
              username: options.username,
              email: options.email,
              role_id: 2,
              password: hashedPassword,
            })
            .returning("*")
            .execute();
          user = result.raw[0];

          const refreshToken = uid(255);
          const isProd = process.env.NODE_ENV === "production" ? true : false;
          const cookie_duration =
            Number(process.env.NOT_REMEMBER_ME_DURATION) || 5;
          token = jwt.sign(
            {
              userId: user.id,
              userName: user.username,
              role: user.role_id,
              email: user.email,
            },
            JWT_SECRET,
            { expiresIn: 300 }
          );

          ctx.cookies.set("refreshToken", refreshToken, {
            path: "/",
            maxAge: 1000 * 60 * 60 * 24 * cookie_duration,
            overwrite: true,
            httpOnly: !isProd,
            sameSite: "lax",
            signed: true,
            secure: isProd,
            domain: process.env.DOMAIN || "churdle.com",
          });

          await User.update(
            { id: user.id },
            {
              refresh_token: refreshToken,
              refresh_expires: new Date(
                Date.now() + 1000 * 60 * 60 * 24 * cookie_duration
              ),
            }
          );
        } catch (err) {
          throw new Error(err);
        }
      }

      return { user, token };
    }
  }
  // acount login
  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Arg("remember_me", { defaultValue: false, nullable: true })
    remember_me: boolean,
    @Ctx() { ctx }: UserContext
  ): Promise<UserResponse> {
    const user = await User.findOne(
      usernameOrEmail.includes("@")
        ? { where: { email: usernameOrEmail } }
        : { where: { username: usernameOrEmail } }
    );
    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "Username doesn't exist",
          },
        ],
      };
    }

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect password",
          },
        ],
      };
    }

    const refreshToken = uid(255);
    const isProd = process.env.NODE_ENV === "production";
    const cookie_duration =
      Number(
        remember_me
          ? process.env.REMEMBER_ME_DURATION
          : process.env.NOT_REMEMBER_ME_DURATION
      ) || 5;
    const token = jwt.sign(
      {
        userId: user.id,
        userName: user.username,
        role: user.role_id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: 300 }
    );

    ctx.cookies.set("refreshToken", refreshToken, {
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * cookie_duration,
      overwrite: true,
      httpOnly: !isProd,
      sameSite: "lax",
      signed: true,
      secure: isProd,
      domain: process.env.DOMAIN || "mikeneder.me",
    });

    await User.update(
      { id: user.id },
      {
        refresh_token: refreshToken,
        refresh_expires: new Date(
          Date.now() + 1000 * 60 * 60 * 24 * cookie_duration
        ),
      }
    );

    return {
      user,
      token,
    };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { ctx }: UserContext) {
    const userId = ctx.state.user.userId;
    if (!userId) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "Invalid User",
          },
        ],
      };
    }
    const isProd = process.env.NODE_ENV === "production";
    ctx.cookies.set("refreshToken", "", {
      httpOnly: !isProd,
      signed: true,
    });
    await User.update(
      { id: userId },
      {
        refresh_token: "",
        refresh_expires: new Date(Date.now() - 1),
      }
    );
    return true;
  }

  //forgot password
  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: UserContext
  ): Promise<boolean> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return false;
    }

    const token = v4();

    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      [{ id: user.id }],
      1000 * 60 * 60 * 24 * 1,
      {
        changed: false,
        rolling: true,
      }
    ); // 1 days expire
    await redis.get(FORGET_PASSWORD_PREFIX + token, 1000 * 60 * 60 * 24 * 1, {
      rolling: true,
    });
    // console.log('client_id', userId);

    return true;
  }
  // confirm password
  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { redis, ctx }: UserContext
  ): Promise<UserResponse | null> {
    if (newPassword.length <= 3) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "Length must be greater than 4",
          },
        ],
      };
    }

    const key = FORGET_PASSWORD_PREFIX + token;
    const userId = await redis.get(key, undefined, { rolling: undefined });
    if (!userId) {
      return {
        errors: [
          {
            field: "token",
            message: "token expired",
          },
        ],
      };
    }

    const userIdNum = parseInt(userId, 10);

    const user = await User.findOne(userIdNum);

    if (!user) {
      return {
        errors: [
          {
            field: "token",
            message: "user no longer exists",
          },
        ],
      };
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);
    await User.update(
      { id: userIdNum },
      {
        password: hashedPassword,
      }
    );

    await redis.destroy(key);

    return { user };
  }
}
