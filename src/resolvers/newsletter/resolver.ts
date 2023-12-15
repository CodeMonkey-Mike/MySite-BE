import {
  Resolver,
  Query,
  FieldResolver,
  ObjectType,
  Field,
  Mutation,
  Arg,
} from "type-graphql";
import { getConnection, In } from "typeorm";
import { FieldError } from "../../utils/fieldError";
import Newsletter from "../../db/entities/newsletter.entity";
import NewsletterTypes from "./types";
import NewsLetterTopics from "../../db/entities/newsletterTopics.entity";

@ObjectType()
class NewsletterResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => [Newsletter], { nullable: true })
  newsletter?: Newsletter[];
}
@ObjectType()
class NewsletterSingleResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Newsletter, { nullable: true })
  newsletter?: Newsletter;
}

@Resolver(Newsletter)
export class NewsletterResolver {
  @FieldResolver(() => String)

  // Get newsletter
  @Query(() => NewsletterResponse, { nullable: true })
  async getNewsletter(): Promise<NewsletterResponse> {
    const newsletter = await Newsletter.find({
      order: {
        id: "ASC",
      },
    });
    const newsletterWithTopics: Newsletter[] & any = [];
    if (!!newsletter.length) {
      for (const n in newsletter) {
        let tpcs: string[] = [];
        if (!!newsletter[n].topics.length) {
          const topicsIds = JSON.parse(newsletter[n].topics);
          const topicTitles = await NewsLetterTopics.find({
            where: {
              id: In(topicsIds),
            },
          });
          tpcs = topicTitles.map((topic) => topic.title);
        }
        newsletterWithTopics.push({
          ...newsletter[n],
          topics: JSON.stringify(tpcs),
        });
      }
    }
    return { newsletter: newsletterWithTopics };
  }

  // Get single newsletter
  @Query(() => NewsletterSingleResponse, { nullable: true })
  async getSingleNewsletter(
    @Arg("id") id: number
  ): Promise<NewsletterSingleResponse> {
    const newsletter = await Newsletter.findOne({
      where: {
        id: id,
      },
    });
    if (!newsletter) {
      throw new Error("No item found!");
    }
    const topicsIds = JSON.parse(newsletter.topics);
    const topicTitles = await NewsLetterTopics.find({
      where: {
        id: In(topicsIds),
      },
    });
    const tpcs = topicTitles.map((topic) => topic.title);
    return {
      // @ts-ignore
      newsletter: {
        ...newsletter,
        topics: `${tpcs}`,
      },
    };
  }

  // create new Newsletter
  @Mutation(() => Boolean)
  async createNewsletter(
    @Arg("options") options: NewsletterTypes
  ): Promise<Boolean> {
    try {
      const isExist = await Newsletter.findOne({
        where: {
          email: options.email,
        },
      });

      if (!!isExist) {
        await Newsletter.update(
          {
            email: options.email,
          },
          { ...options }
        );
      } else {
        await getConnection()
          .createQueryBuilder()
          .insert()
          .into(Newsletter)
          .values(options)
          .returning("*")
          .execute();
      }
      return true;
    } catch (err) {
      throw new Error(err);
    }
  }
  // delete Newsletter
  @Mutation(() => Boolean)
  async deleteNewsletter(@Arg("id") id: number) {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Newsletter)
      .where("id = :id", { id: id })
      .execute();
    return true;
  }
  // update youtubes
  @Mutation(() => NewsletterSingleResponse, { nullable: true })
  async updateNewsletter(@Arg("options") options: NewsletterTypes) {
    let newsletter;
    if (!options.id) {
      throw new Error("No id provide!");
    }
    const hasItem = await Newsletter.findOneOrFail({
      where: {
        id: options.id,
      },
    });
    console.log("hasItem:", hasItem);
    if (!hasItem) {
      throw new Error("No item found!");
    }
    const update = await Newsletter.update(
      {
        id: options.id,
      },
      { ...options }
    );
    if (update) {
      newsletter = await Newsletter.findOne({
        where: {
          id: options.id,
        },
      });
    }
    return { newsletter };
  }
}
