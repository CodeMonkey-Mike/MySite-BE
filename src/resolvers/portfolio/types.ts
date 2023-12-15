import { InputType, Field } from "type-graphql";

@InputType()
export class DPhoto {
  @Field()
  category: string;
  @Field()
  parent_id: number;
  @Field()
  id: number;
}
@InputType()
export default class PortfoliosTypes {
  @Field({ nullable: true })
  id!: number;

  @Field()
  type!: string;

  @Field({ nullable: true })
  logo!: string;

  @Field()
  client!: string;

  @Field()
  description!: string;

  @Field({ nullable: true })
  category: string;

  @Field({ nullable: true })
  url: string;

  @Field({ nullable: true })
  year: string;

  @Field({ nullable: true })
  detail: string;

  @Field({ nullable: true })
  facebook: string;

  @Field({ nullable: true })
  twitter: string;

  @Field({ nullable: true })
  pinterest: string;

  @Field({ nullable: true })
  linkedin: string;

  @Field()
  sequence: number;
}
