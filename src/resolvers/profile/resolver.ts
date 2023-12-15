import { GraphQLUpload, FileUpload } from "graphql-upload";
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
import { getConnection } from "typeorm";
import Profile from "../../db/entities/profile.entity";
import { FieldError } from "../../utils/fieldError";
import ProfileTypes from "./types";
import { Upload } from "../../utils/upload";
import { v4 } from "uuid";

@ObjectType()
class ProfileResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Profile, { nullable: true })
  profile?: Profile;
}

@Resolver(Profile)
export class ProfileResolver {
  // Get profile
  @Query(() => ProfileResponse)
  async getProfile(): Promise<ProfileResponse> {
    const profile = await Profile.findOne();
    return { profile };
  }

  // Get sitemap
  @Query(() => String, { nullable: true })
  async getSiteMap(): Promise<String | undefined> {
    const profile = await Profile.findOne();
    return profile?.sitemap;
  }

  // Update profile
  @Mutation(() => ProfileResponse)
  async updateProfile(
    @Arg("options") options: ProfileTypes
  ): Promise<ProfileResponse> {
    if (options.id) {
      await Profile.update(
        { id: options.id },
        {
          ...options,
        }
      );
      const profile = await Profile.findOne(options.id);
      return { profile };
    } else {
      const res = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Profile)
        .values({
          ...options,
        })
        .returning("*")
        .execute();
      const profile = res.raw[0];
      return { profile };
    }
  }

  @Mutation(() => Boolean)
  async uploadCV(
    @Arg("id") id: number,
    @Arg("file", () => GraphQLUpload, { nullable: true }) file: FileUpload,
    @Ctx() { ctx }: Context
  ) {
    try {
      if (file) {
        await Upload(file, async (url: string) => {
          await Profile.update(
            {
              id,
            },
            { cv: ctx.request.origin + url }
          );
        });
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }
  @Mutation(() => Boolean)
  async uploadMediaKit(
    @Arg("id") id: number,
    @Arg("file", () => GraphQLUpload, { nullable: true }) file: FileUpload,
    @Ctx() { ctx }: Context
  ) {
    try {
      if (file) {
        await Upload(file, async (url: string) => {
          await Profile.update(
            {
              id,
            },
            { media_kit: ctx.request.origin + url }
          );
        });
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }
  @Mutation(() => Boolean)
  async uploadSlides(
    @Arg("id") id: number,
    @Arg("files", () => [GraphQLUpload], { nullable: true })
    files: FileUpload[],
    @Arg("deleted_files", () => [String], { nullable: true })
    deleted_files: [String],
    @Ctx() { ctx }: Context
  ) {
    const filePaths: any[] = [];
    let restImgs: any[] = [];
    try {
      const profile = await Profile.findOne();
      const slides = profile?.slider_images;
      if (deleted_files && slides) {
        restImgs = JSON.parse(slides).filter(
          (sl: { uid: string }) => !deleted_files.includes(sl.uid)
        );
        await Profile.update(
          {
            id: profile?.id,
          },
          {
            slider_images: JSON.stringify(restImgs),
          }
        );
      } else if (slides) {
        restImgs = JSON.parse(slides);
      }
      if (files && !!files.length) {
        await Promise.all(
          files.map(async (file) => {
            await Upload(file, async (url: string) => {
              filePaths.push({
                uid: v4(),
                url: ctx.request.origin + url,
              });
            });
          })
        );
        await Profile.update(
          {
            id,
          },
          { slider_images: JSON.stringify(filePaths.concat(restImgs)) }
        );
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }
  @Mutation(() => Boolean)
  async updateSitemap(@Arg("id") id: number, @Arg("sitemap") sitemap: string) {
    try {
      await Profile.update(
        { id },
        {
          sitemap,
        }
      );
      return true;
    } catch (_) {
      return false;
    }
  }
}
