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
import Carousel from "../../db/entities/carousel.entity";
import CarouselTypes from "./types";

@ObjectType()
class CarouselResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => [Carousel], { nullable: true })
  carousel?: Carousel[];
}

@Resolver(Carousel)
export class CarouselResolver {
  @FieldResolver(() => String)

  // Get carousel
  @Query(() => CarouselResponse, { nullable: true })
  async getCarousels(): Promise<CarouselResponse> {
    const carousel = await Carousel.find({
      order: {
        id: "DESC",
      },
    });
    return { carousel };
  }

  // create new carousel
  @Mutation(() => CarouselResponse)
  async createCarousel(
    @Arg("options") options: CarouselTypes
  ): Promise<CarouselResponse> {
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Carousel)
        .values(options)
        .returning("*")
        .execute();
      const carousel = await Carousel.find({
        order: {
          id: "DESC",
        },
      });
      return { carousel };
    } catch (err) {
      throw new Error(err);
    }
  }
  // delete new carousel
  @Mutation(() => CarouselResponse)
  async deleteCarousel(@Arg("id") id: number) {
    const item = await Carousel.find({
      where: {
        id: id,
      },
    });
    await Carousel.remove(item);
    const carousel = await Carousel.find({
      order: {
        id: "DESC",
      },
    });
    return { carousel };
  }
  // update carousel
  @Mutation(() => CarouselResponse)
  async updateCarousel(@Arg("options") options: CarouselTypes) {
    await Carousel.update(
      {
        id: options.id,
      },
      { ...options }
    );
    const carousel = await Carousel.find({
      order: {
        id: "DESC",
      },
    });
    return { carousel };
  }
}
