import { InputType, Field } from "type-graphql";

@InputType()
export default class PhotoTypes {
  @Field({ nullable: true })
  id!: number;

  @Field()
  url!: string;

  @Field()
  parent_id!: number;

  @Field()
  category!: string;
}
