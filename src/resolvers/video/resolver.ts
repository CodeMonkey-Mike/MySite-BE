import {
  Resolver,
  Query,
  FieldResolver,
  ObjectType,
  Field,
  Mutation,
  Arg,
} from "type-graphql";
import { FieldError } from "../../utils/fieldError";
import Video from "../../db/entities/video.entity";
import VideoTypes from "./types";
import { getConnection } from "typeorm";

@ObjectType()
class VideoResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Video, { nullable: true })
  video?: Video;
}

@Resolver(Video)
export class VideoResolver {
  @FieldResolver(() => String)

  // Get video
  @Query(() => VideoResponse, { nullable: true })
  async getVideo(): Promise<VideoResponse> {
    const video = await Video.findOne();
    return { video };
  }

  // create new role
  @Mutation(() => VideoResponse)
  async createVideo(
    @Arg("options") options: VideoTypes
  ): Promise<VideoResponse> {
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Video)
        .values(options)
        .returning("*")
        .execute();
      const video = await Video.findOne();
      return { video };
    } catch (err) {
      throw new Error(err);
    }
  }
  // delete new role
  @Mutation(() => Boolean)
  async deleteVideo(@Arg("id") id: number) {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Video)
      .where("id = :id", { id: id })
      .execute();
    return true;
  }
  // update role
  @Mutation(() => VideoResponse)
  async updateVideo(@Arg("options") options: VideoTypes) {
    await Video.update(
      {
        id: options.id,
      },
      { ...options }
    );
    const video = await Video.findOne();
    return { video };
  }
}
