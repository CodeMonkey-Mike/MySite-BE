import {
  Resolver,
  Query,
  ObjectType,
  Field,
  Mutation,
  Arg,
  Ctx,
} from "type-graphql";
import { Context } from "koa";
import { FieldError } from "../../utils/fieldError";
import Awards from "../../db/entities/awards.entity";
import AwardsTypes from "./types";
import { getConnection } from "typeorm";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Upload } from "../../utils/upload";

@ObjectType()
class AwardsResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => [Awards], { nullable: true })
  awards?: Awards[];
}

@Resolver(Awards)
export class AwardsResolver {
  // Get awards
  @Query(() => AwardsResponse, { nullable: true })
  async getAwards(): Promise<AwardsResponse> {
    const awards = await Awards.find({
      order: {
        id: "ASC",
      },
    });
    return { awards };
  }

  // create new role
  @Mutation(() => AwardsResponse)
  async createAward(
    @Arg("options") options: AwardsTypes,
    @Arg("file", () => GraphQLUpload, { nullable: true }) file: FileUpload,
    @Ctx() { ctx }: Context
  ): Promise<AwardsResponse> {
    try {
      await Upload(file, async (url: string) => {
        await getConnection()
          .createQueryBuilder()
          .insert()
          .into(Awards)
          .values({ ...options, image: ctx.request.origin + url })
          .returning("*")
          .execute();
      });
      const awards = await Awards.find({
        order: {
          id: "ASC",
        },
      });
      return { awards };
    } catch (err) {
      throw new Error(err);
    }
  }
  // delete new role
  @Mutation(() => AwardsResponse)
  async deleteAward(@Arg("id") id: number) {
    const award = await Awards.find({
      where: {
        id: id,
      },
    });
    await Awards.remove(award);
    const awards = await Awards.find({
      order: {
        id: "ASC",
      },
    });
    return { awards };
  }
  // update role
  @Mutation(() => AwardsResponse)
  async updateAward(
    @Arg("options") options: AwardsTypes,
    @Arg("file", () => GraphQLUpload, { nullable: true }) file: FileUpload,
    @Ctx() { ctx }: Context
  ) {
    if (!file) {
      await Awards.update(
        {
          id: options.id,
        },
        { ...options }
      );
    } else {
      await Upload(file, async (url: string) => {
        await Awards.update(
          {
            id: options.id,
          },
          { ...options, image: ctx.request.origin + url }
        );
      });
    }
    const awards = await Awards.find({
      order: {
        id: "ASC",
      },
    });
    return { awards };
  }
}
