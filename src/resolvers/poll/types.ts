import { InputType, Field } from "type-graphql";

@InputType()
export default class PollTypes {
  @Field({ nullable: true })
  id!: number;

  @Field()
  title!: string;

  @Field()
  topic!: string;

  @Field()
  category!: string;

  @Field()
  options!: string;
}
