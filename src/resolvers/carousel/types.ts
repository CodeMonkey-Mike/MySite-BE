import { InputType, Field } from "type-graphql";

@InputType()
export default class CarouselTypes {
  @Field({ nullable: true })
  id!: number;

  @Field()
  title!: string;
}
