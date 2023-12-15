import {
  Resolver,
  Query,
  FieldResolver,
  ObjectType,
  Field,
  Mutation,
  Arg,
} from "type-graphql";
import { getConnection } from "typeorm";
import { FieldError } from "../../utils/fieldError";
import Youtubes from "../../db/entities/youtubes.entity";
import YoutubesTypes from "./types";

@ObjectType()
class YoutubesResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => [Youtubes], { nullable: true })
  youtubes?: Youtubes[];
}

@Resolver(Youtubes)
export class YoutubesResolver {
  @FieldResolver(() => String)

  // Get youtubes
  @Query(() => YoutubesResponse, { nullable: true })
  async getYoutubes(): Promise<YoutubesResponse> {
    const youtubes = await Youtubes.find({
      order: {
        sequence: "ASC",
      },
    });
    return { youtubes };
  }

  // create new youtubes
  @Mutation(() => YoutubesResponse)
  async createYoutube(
    @Arg("options") options: YoutubesTypes
  ): Promise<YoutubesResponse> {
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Youtubes)
        .values(options)
        .returning("*")
        .execute();
      const youtubes = await Youtubes.find({
        order: {
          id: "ASC",
        },
      });
      return { youtubes };
    } catch (err) {
      throw new Error(err);
    }
  }
  // delete new youtubes
  @Mutation(() => YoutubesResponse)
  async deleteYoutube(@Arg("id") id: number) {
    const youtube = await Youtubes.find({
      where: {
        id: id,
      },
    });
    await Youtubes.remove(youtube);
    const youtubes = await Youtubes.find({
      order: {
        id: "ASC",
      },
    });
    return { youtubes };
  }
  // update youtubes
  @Mutation(() => YoutubesResponse)
  async updateYoutube(@Arg("options") options: YoutubesTypes) {
    await Youtubes.update(
      {
        id: options.id,
      },
      { ...options }
    );
    const youtubes = await Youtubes.find({
      order: {
        id: "ASC",
      },
    });
    return { youtubes };
  }

  @Mutation(() => YoutubesResponse)
  async bulkUpdateYoutubes(
    @Arg("options", () => [YoutubesTypes]) options: YoutubesTypes[]
  ) {
    options.forEach(async (experience: YoutubesTypes) => {
      const oldYoutube = await Youtubes.findOneOrFail(experience.id);
      Object.assign(oldYoutube, experience);
      await oldYoutube.save();
    });

    const youtubes = await Youtubes.find({
      order: {
        sequence: "ASC",
      },
    });
    return { youtubes };
  }
}
