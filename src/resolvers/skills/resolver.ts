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
import Skills from "../../db/entities/skills.entity";
import SkillsTypes from "./types";
import { getConnection } from "typeorm";

@ObjectType()
class SkillsResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => [Skills], { nullable: true })
  skills?: Skills[];
}

@Resolver(Skills)
export class SkillsResolver {
  @FieldResolver(() => String)

  // Get skills
  @Query(() => SkillsResponse, { nullable: true })
  async getSkills(): Promise<SkillsResponse> {
    const skills = await Skills.find({
      order: {
        sequence: "ASC",
      },
    });
    return { skills };
  }

  // create new role
  @Mutation(() => SkillsResponse)
  async createSkill(
    @Arg("options") options: SkillsTypes
  ): Promise<SkillsResponse> {
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Skills)
        .values(options)
        .returning("*")
        .execute();
      const skills = await Skills.find();
      return { skills };
    } catch (err) {
      throw new Error(err);
    }
  }
  // delete new role
  @Mutation(() => SkillsResponse)
  async deleteSkill(@Arg("id") id: number) {
    const skill = await Skills.find({
      where: {
        id: id,
      },
    });
    await Skills.remove(skill);
    const skills = await Skills.find({
      order: {
        sequence: "ASC",
      },
    });
    return { skills };
  }
  // update role
  @Mutation(() => SkillsResponse)
  async updateSkill(@Arg("options") options: SkillsTypes) {
    await Skills.update(
      {
        id: options.id,
      },
      { ...options }
    );
    const skills = await Skills.find({
      order: {
        sequence: "ASC",
      },
    });
    return { skills };
  }
  @Mutation(() => SkillsResponse)
  async bulkUpdateSkills(
    @Arg("options", () => [SkillsTypes]) options: SkillsTypes[]
  ) {
    options.forEach(async (skill: SkillsTypes) => {
      const oldSkill = await Skills.findOneOrFail(skill.id);
      Object.assign(oldSkill, skill);
      await oldSkill.save();
    });

    const skills = await Skills.find({
      order: {
        sequence: "ASC",
      },
    });
    return { skills };
  }
}
