import { InputType, Field } from "type-graphql";

@InputType()
export default class AwardsTypes {
  @Field({ nullable: true })
  id!: number;

  @Field()
  awardTime!: string;

  @Field()
  company!: string;

  @Field({ nullable: true })
  image!: string;

  @Field()
  title!: string;
}
