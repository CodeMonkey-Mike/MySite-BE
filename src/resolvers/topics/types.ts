import { InputType, Field } from "type-graphql";

@InputType()
export default class NewsletterTopicsTypes {
  @Field({ nullable: true })
  id!: number;
  @Field({ nullable: true })
  title!: string;
}
