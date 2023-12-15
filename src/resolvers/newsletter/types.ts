import { InputType, Field } from "type-graphql";

@InputType()
export default class NewsLetterTypes {
  @Field({ nullable: true })
  id!: number;

  @Field()
  email!: string;

  @Field({ nullable: true })
  topics!: string;
}
