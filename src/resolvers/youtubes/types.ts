import { InputType, Field } from "type-graphql";

@InputType()
export default class YoutubesTypes {
  @Field({ nullable: true })
  id!: number;

  @Field({ nullable: true })
  title!: string;

  @Field({ nullable: true })
  code!: string;

  @Field({ nullable: true })
  url!: string;

  @Field()
  sequence!: number;
}
