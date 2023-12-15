import { InputType, Field } from "type-graphql";

@InputType()
export default class EducationTypes {
  @Field({ nullable: true })
  id!: number;
  @Field()
  degree!: string;
  @Field()
  description!: string;
  @Field()
  endMonth!: number;
  @Field()
  endYear!: number;
  @Field()
  location!: string;
  @Field()
  school!: string;
  @Field()
  startMonth!: number;
  @Field()
  startYear!: number;
}
