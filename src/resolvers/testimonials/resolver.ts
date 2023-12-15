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
import Testimonials from "../../db/entities/testimonials.entity";
import TestimonialsTypes from "./types";

@ObjectType()
class TestimonialsResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => [Testimonials], { nullable: true })
  testimonials?: Testimonials[];
}

@Resolver(Testimonials)
export class TestimonialsResolver {
  @FieldResolver(() => String)

  // Get testimonials
  @Query(() => TestimonialsResponse, { nullable: true })
  async getTestimonials(): Promise<TestimonialsResponse> {
    const testimonials = await Testimonials.find({
      order: {
        id: "ASC",
      },
    });
    return { testimonials };
  }

  // create new role
  @Mutation(() => TestimonialsResponse)
  async createTestimonial(
    @Arg("options") options: TestimonialsTypes
  ): Promise<TestimonialsResponse> {
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Testimonials)
        .values(options)
        .returning("*")
        .execute();
      const testimonials = await Testimonials.find({
        order: {
          id: "ASC",
        },
      });
      return { testimonials };
    } catch (err) {
      throw new Error(err);
    }
  }
  // delete new role
  @Mutation(() => TestimonialsResponse)
  async deleteTestimonial(@Arg("id") id: number) {
    const testimonial = await Testimonials.find({
      where: {
        id: id,
      },
    });
    await Testimonials.remove(testimonial);
    const testimonials = await Testimonials.find({
      order: {
        id: "ASC",
      },
    });
    return { testimonials };
  }
  // update role
  @Mutation(() => TestimonialsResponse)
  async updateTestimonial(@Arg("options") options: TestimonialsTypes) {
    await Testimonials.update(
      {
        id: options.id,
      },
      { ...options }
    );
    const testimonials = await Testimonials.find({
      order: {
        id: "ASC",
      },
    });
    return { testimonials };
  }
}
