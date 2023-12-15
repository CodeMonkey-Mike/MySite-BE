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
import CarouselSlides from "../../db/entities/carousel_slides.entity";
import CarouselSlidesTypes from "./types";

@ObjectType()
class CarouselSlidesResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => [CarouselSlides], { nullable: true })
  carouselSlides?: CarouselSlides[];
}

@Resolver(CarouselSlides)
export class CarouselSlidesResolver {
  @FieldResolver(() => String)

  // Get carousel
  @Query(() => CarouselSlidesResponse, { nullable: true })
  async getCarouselSlides(
    @Arg("carousel_id") carousel_id: number
  ): Promise<CarouselSlidesResponse> {
    const carouselSlides = await CarouselSlides.find({
      where: {
        carousel_id,
      },
      order: {
        id: "ASC",
      },
    });
    return { carouselSlides };
  }

  // create new carousel slide
  @Mutation(() => CarouselSlidesResponse)
  async createCarouselSlide(
    @Arg("options") options: CarouselSlidesTypes
  ): Promise<CarouselSlidesResponse> {
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(CarouselSlides)
        .values(options)
        .returning("*")
        .execute();
      const carouselSlides = await CarouselSlides.find({
        order: {
          id: "ASC",
        },
      });
      return { carouselSlides };
    } catch (err) {
      throw new Error(err);
    }
  }
  // delete new carousel slide
  @Mutation(() => CarouselSlidesResponse)
  async deleteCarouselSlide(@Arg("id") id: number) {
    const carouselSlide = await CarouselSlides.find({
      where: {
        id: id,
      },
    });
    await CarouselSlides.remove(carouselSlide);
    const carouselSlides = await CarouselSlides.find({
      order: {
        id: "ASC",
      },
    });
    return { carouselSlides };
  }
  // update carousel slide
  @Mutation(() => CarouselSlidesResponse)
  async updateCarouselSlide(@Arg("options") options: CarouselSlidesTypes) {
    await CarouselSlides.update(
      {
        id: options.id,
      },
      { ...options }
    );
    const carouselSlides = await CarouselSlides.find({
      order: {
        id: "ASC",
      },
    });
    return { carouselSlides };
  }
}
