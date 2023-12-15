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
import Channels from "../../db/entities/channels.entity";
import ChannelsTypes from "./types";
import { getConnection } from "typeorm";

@ObjectType()
class ChannelsResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => [Channels], { nullable: true })
  channels?: Channels[];
}

@Resolver(Channels)
export class ChannelsResolver {
  @FieldResolver(() => String)

  // Get channels
  @Query(() => ChannelsResponse, { nullable: true })
  async getChannels(): Promise<ChannelsResponse> {
    const channels = await Channels.find({
      order: {
        id: "ASC",
      },
    });
    return { channels };
  }

  // create new role
  @Mutation(() => ChannelsResponse)
  async createChannel(
    @Arg("options") options: ChannelsTypes
  ): Promise<ChannelsResponse> {
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Channels)
        .values(options)
        .returning("*")
        .execute();
      const channels = await Channels.find({
        order: {
          id: "ASC",
        },
      });
      return { channels };
    } catch (err) {
      throw new Error(err);
    }
  }
  // delete new role
  @Mutation(() => ChannelsResponse)
  async deleteChannel(@Arg("id") id: number) {
    const channel = await Channels.find({
      where: {
        id: id,
      },
    });
    await Channels.remove(channel);
    const channels = await Channels.find({
      order: {
        id: "ASC",
      },
    });
    return { channels };
  }
  // update role
  @Mutation(() => ChannelsResponse)
  async updateChannel(@Arg("options") options: ChannelsTypes) {
    await Channels.update(
      {
        id: options.id,
      },
      { ...options }
    );
    const channels = await Channels.find({
      order: {
        id: "ASC",
      },
    });
    return { channels };
  }
}
