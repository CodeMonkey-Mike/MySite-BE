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
import CarouselTopics from "../../db/entities/carousel_topics.entity";
import CarouselTopicsTypes from "./types";

@ObjectType()
class CarouselTopicsResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => [CarouselTopics], { nullable: true })
  carouselTopics?: CarouselTopics[];
}

@Resolver(CarouselTopics)
export class CarouselTopicsResolver {
  @FieldResolver(() => String)

  // Get carouselTopics
  @Query(() => CarouselTopicsResponse, { nullable: true })
  async getCarouselTopics(): Promise<CarouselTopicsResponse> {
    const carouselTopics = await CarouselTopics.find({
      order: {
        id: "DESC",
      },
    });
    return { carouselTopics };
  }

  // create new carouselTopics
  @Mutation(() => CarouselTopicsResponse)
  async createCarouselTopic(
    @Arg("options") options: CarouselTopicsTypes
  ): Promise<CarouselTopicsResponse> {
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(CarouselTopics)
        .values(options)
        .returning("*")
        .execute();
      const carouselTopics = await CarouselTopics.find({
        order: {
          id: "DESC",
        },
      });
      return { carouselTopics };
    } catch (err) {
      throw new Error(err);
    }
  }
  // delete new carouselTopics
  @Mutation(() => CarouselTopicsResponse)
  async deleteCarouselTopic(@Arg("id") id: number) {
    const carouselTopic = await CarouselTopics.find({
      where: {
        id: id,
      },
    });
    await CarouselTopics.remove(carouselTopic);
    const carouselTopics = await CarouselTopics.find({
      order: {
        id: "DESC",
      },
    });
    return { carouselTopics };
  }
  // update carouselTopics
  @Mutation(() => CarouselTopicsResponse)
  async updateCarouselTopic(@Arg("options") options: CarouselTopicsTypes) {
    await CarouselTopics.update(
      {
        id: options.id,
      },
      { ...options }
    );
    const carouselTopics = await CarouselTopics.find({
      order: {
        id: "DESC",
      },
    });
    return { carouselTopics };
  }
}
