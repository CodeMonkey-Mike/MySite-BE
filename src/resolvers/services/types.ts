import { InputType, Field } from "type-graphql";

@InputType()
export default class ServicesTypes {
  @Field({ nullable: true })
  id!: number;
  @Field({ nullable: true })
  image: string;
  @Field()
  name!: string;
}
