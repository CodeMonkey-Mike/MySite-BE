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
import NewsletterTopics from "../../db/entities/newsletterTopics.entity";
import NewsletterTopicsTypes from "./types";

@ObjectType()
class NewsletterTopicsResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => [NewsletterTopics], { nullable: true })
  newsletterTopics?: NewsletterTopics[];
}

@Resolver(NewsletterTopics)
export class NewsletterTopicsResolver {
  @FieldResolver(() => String)

  // Get newsletter topics
  @Query(() => NewsletterTopicsResponse, { nullable: true })
  async getNewsletterTopics(): Promise<NewsletterTopicsResponse> {
    const newsletterTopics = await NewsletterTopics.find({
      order: {
        id: "ASC",
      },
    });
    return { newsletterTopics };
  }

  // create new NewsletterTopics
  @Mutation(() => NewsletterTopicsResponse)
  async createNewsletterTopics(
    @Arg("options") options: NewsletterTopicsTypes
  ): Promise<NewsletterTopicsResponse> {
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(NewsletterTopics)
        .values(options)
        .returning("*")
        .execute();
      const newsletterTopics = await NewsletterTopics.find();
      return { newsletterTopics };
    } catch (err) {
      throw new Error(err);
    }
  }
  // delete NewsletterTopics
  @Mutation(() => Boolean)
  async deleteNewsletterTopics(@Arg("id") id: number) {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(NewsletterTopics)
      .where("id = :id", { id: id })
      .execute();
    return true;
  }
  // update NewsletterTopics
  @Mutation(() => NewsletterTopicsResponse, { nullable: true })
  async updateNewsletterTopics(@Arg("options") options: NewsletterTopicsTypes) {
    let newsletterTopics;
    if (!options.id) {
      throw new Error("No id provide!");
    }
    const hasItem = await NewsletterTopics.findOneOrFail({
      where: {
        id: options.id,
      },
    });
    if (!hasItem) {
      throw new Error("No item found!");
    }
    const update = await NewsletterTopics.update(
      {
        id: options.id,
      },
      { ...options }
    );
    if (update) {
      newsletterTopics = await NewsletterTopics.find();
    }
    return { newsletterTopics };
  }
  @Mutation(() => NewsletterTopicsResponse)
  async bulkUpdateNewsletters(
    @Arg("options", () => [NewsletterTopicsTypes])
    options: NewsletterTopicsTypes[]
  ) {
    try {
      options.forEach(async (topic: NewsletterTopicsTypes) => {
        const oldExperience = await NewsletterTopics.findOneOrFail(topic.id);
        Object.assign(oldExperience, topic);
        await oldExperience.save();
      });

      const newsletterTopics = await NewsletterTopics.find({
        order: {
          id: "ASC",
        },
      });
      return { newsletterTopics };
    } catch (e) {
      throw new Error(e);
    }
  }
}
