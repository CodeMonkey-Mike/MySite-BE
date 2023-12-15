import { InputType, Field } from "type-graphql";

@InputType()
export default class TestimonialsTypes {
  @Field({ nullable: true })
  id!: number;
  @Field()
  name!: string;

  @Field()
  company!: string;

  @Field()
  quote!: string;
}
