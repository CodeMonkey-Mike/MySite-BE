import {
  Resolver,
  Query,
  ObjectType,
  Field,
  Mutation,
  Arg,
} from "type-graphql";
import { FieldError } from "../../utils/fieldError";
import Experiences from "../../db/entities/experiences.entity";
import ExperiencesTypes from "./types";
import { getConnection } from "typeorm";

@ObjectType()
class ExperiencesResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => [Experiences], { nullable: true })
  experiences?: Experiences[];
}

@Resolver(Experiences)
export class ExperiencesResolver {
  // Get Experiences
  @Query(() => ExperiencesResponse, { nullable: true })
  async getExperiences(): Promise<ExperiencesResponse> {
    const experiences = await Experiences.find({
      order: {
        sequence: "ASC",
      },
    });
    return { experiences };
  }

  // create new experience
  @Mutation(() => ExperiencesResponse)
  async createExperience(
    @Arg("options") options: ExperiencesTypes
  ): Promise<ExperiencesResponse> {
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Experiences)
        .values(options)
        .returning("*")
        .execute();
      const experiences = await Experiences.find({
        order: {
          sequence: "ASC",
        },
      });
      return { experiences };
    } catch (err) {
      throw new Error(err);
    }
  }
  // delete new experience
  @Mutation(() => ExperiencesResponse)
  async deleteExperience(@Arg("id") id: number) {
    const experience = await Experiences.find({
      where: {
        id: id,
      },
    });
    await Experiences.remove(experience);
    const experiences = await Experiences.find({
      order: {
        sequence: "ASC",
      },
    });
    return { experiences };
  }
  // update experience
  @Mutation(() => ExperiencesResponse)
  async updateExperience(@Arg("options") options: ExperiencesTypes) {
    await Experiences.update(
      {
        id: options.id,
      },
      { ...options }
    );
    const experiences = await Experiences.find();
    return { experiences };
  }
  @Mutation(() => ExperiencesResponse)
  async bulkUpdateExperiences(
    @Arg("options", () => [ExperiencesTypes]) options: ExperiencesTypes[]
  ) {
    options.forEach(async (experience: ExperiencesTypes) => {
      const oldExperience = await Experiences.findOneOrFail(experience.id);
      Object.assign(oldExperience, experience);
      await oldExperience.save();
    });

    const experiences = await Experiences.find({
      order: {
        sequence: "ASC",
      },
    });
    return { experiences };
  }
}
