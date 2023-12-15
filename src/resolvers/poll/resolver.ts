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
import Poll from "../../db/entities/poll.entity";
import PollTypes from "./types";

@ObjectType()
class PollResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => [Poll], { nullable: true })
  polls?: Poll[];
}

@Resolver(Poll)
export class PollResolver {
  @FieldResolver(() => String)

  // Get polls
  @Query(() => PollResponse, { nullable: true })
  async getPolls(): Promise<PollResponse> {
    const polls = await Poll.find({
      order: {
        id: "DESC",
      },
    });
    return { polls };
  }

  // create new poll
  @Mutation(() => PollResponse)
  async createPoll(@Arg("options") options: PollTypes): Promise<PollResponse> {
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Poll)
        .values(options)
        .returning("*")
        .execute();
      const polls = await Poll.find({
        order: {
          id: "DESC",
        },
      });
      return { polls };
    } catch (err) {
      throw new Error(err);
    }
  }
  // delete new poll
  @Mutation(() => PollResponse)
  async deletePoll(@Arg("id") id: number) {
    const youtube = await Poll.find({
      where: {
        id: id,
      },
    });
    await Poll.remove(youtube);
    const polls = await Poll.find({
      order: {
        id: "DESC",
      },
    });
    return { polls };
  }
  // update poll
  @Mutation(() => PollResponse)
  async updatePoll(@Arg("options") options: PollTypes) {
    await Poll.update(
      {
        id: options.id,
      },
      { ...options }
    );
    const polls = await Poll.find({
      order: {
        id: "DESC",
      },
    });
    return { polls };
  }
}
