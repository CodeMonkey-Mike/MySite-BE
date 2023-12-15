import { InputType, Field } from "type-graphql";

@InputType()
export default class ExperiencesTypes {
  @Field({ nullable: true })
  id!: number;
  @Field()
  company!: string;
  @Field()
  current!: boolean;
  @Field({ nullable: true })
  hide: boolean;
  @Field()
  description!: string;
  @Field({ nullable: true })
  endMonth!: number;
  @Field({ nullable: true })
  endYear!: number;
  @Field()
  sequence!: number;
  @Field()
  title!: string;
  @Field({ nullable: true })
  website: string;
  @Field({ nullable: true })
  website_url: string;
  @Field()
  startMonth!: number;
  @Field()
  startYear!: number;
}
