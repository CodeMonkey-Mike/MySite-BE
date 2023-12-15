import { InputType, Field } from "type-graphql";

@InputType()
export default class TagsTypes {
  @Field({ nullable: true })
  id!: number;
  @Field()
  title!: string;
  @Field({ nullable: true })
  slug!: string;
  @Field({ nullable: true })
  created_at: Date;
}
