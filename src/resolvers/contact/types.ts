import { InputType, Field } from "type-graphql";

@InputType()
export default class EmailTypes {
  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  subject!: string;

  @Field()
  message!: string;
}
