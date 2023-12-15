import { InputType, Field } from "type-graphql";

@InputType()
export default class CarouselSlidesTypes {
  @Field({ nullable: true })
  id!: number;

  @Field()
  description!: string;

  @Field({ nullable: true })
  hashtag!: string;

  @Field()
  sequence!: string;

  @Field({ nullable: true })
  carousel_id!: number;
}
