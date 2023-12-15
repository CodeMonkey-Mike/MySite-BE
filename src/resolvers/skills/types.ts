import { InputType, Field } from "type-graphql";

@InputType()
export default class SkillsTypes {
  @Field({ nullable: true })
  id!: number;
  @Field()
  strength!: number;
  @Field()
  name!: string;
  @Field()
  sequence!: number;
}
