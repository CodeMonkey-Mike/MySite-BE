import { InputType, Field } from "type-graphql";

@InputType()
export default class VideoTypes {
  @Field({ nullable: true })
  id!: number;
  @Field()
  url!: string;
  @Field()
  title!: string;
}
