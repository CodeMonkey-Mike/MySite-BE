import {
  Resolver,
  Query,
  ObjectType,
  Field,
  Mutation,
  Arg,
} from "type-graphql";
import { FieldError } from "../../utils/fieldError";
import Educations from "../../db/entities/educations.entity";
import EducationTypes from "./types";
import { getConnection } from "typeorm";

@ObjectType()
class EducationsResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => [Educations], { nullable: true })
  educations?: Educations[];
}

@Resolver(Educations)
export class EducationsResolver {
  // Get Educations
  @Query(() => EducationsResponse, { nullable: true })
  async getEducations(): Promise<EducationsResponse> {
    const educations = await Educations.find({
      order: {
        id: "ASC",
      },
    });
    return { educations };
  }

  // create new role
  @Mutation(() => EducationsResponse)
  async createEducation(
    @Arg("options") options: EducationTypes
  ): Promise<EducationsResponse> {
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Educations)
        .values(options)
        .returning("*")
        .execute();
      const educations = await Educations.find({
        order: {
          id: "ASC",
        },
      });
      return { educations };
    } catch (err) {
      throw new Error(err);
    }
  }
  // delete new role
  @Mutation(() => EducationsResponse)
  async deleteEducation(@Arg("id") id: number) {
    const education = await Educations.find({
      where: {
        id: id,
      },
    });
    await Educations.remove(education);
    const educations = await Educations.find({
      order: {
        id: "ASC",
      },
    });
    return { educations };
  }
  // update role
  @Mutation(() => EducationsResponse)
  async updateEducation(@Arg("options") options: EducationTypes) {
    await Educations.update(
      {
        id: options.id,
      },
      { ...options }
    );
    const educations = await Educations.find({
      order: {
        id: "ASC",
      },
    });
    return { educations };
  }
}
