import { InputType, Field } from "type-graphql";

@InputType()
export default class ChannelsTypes {
  @Field({ nullable: true })
  id!: number;
  @Field()
  url!: string;
  @Field()
  icon!: string;
  @Field()
  visible!: boolean;
  @Field()
  sequence!: number;
}
