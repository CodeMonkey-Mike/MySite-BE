import { InputType, Field } from "type-graphql";

@InputType()
export default class CarouselTopicsTypes {
  @Field({ nullable: true })
  id!: number;

  @Field({ nullable: true })
  topic!: string;

  @Field()
  content!: string;
}
