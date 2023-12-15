import { InputType, Field } from "type-graphql";

@InputType()
export default class ProcessesTypes {
  @Field({ nullable: true })
  id!: number;
  @Field()
  icon!: string;
  @Field()
  name!: string;
  @Field()
  sequence!: number;
}
