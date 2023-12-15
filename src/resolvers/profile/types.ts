import { InputType, Field } from "type-graphql";

@InputType()
export default class ProfileTypes {
  @Field({ nullable: true })
  id!: number;
  @Field({ nullable: true })
  address!: string;
  @Field({ nullable: true })
  address1!: string;
  @Field({ nullable: true })
  bio!: string;
  @Field({ nullable: true })
  birthPlace!: string;
  @Field({ nullable: true })
  dob!: string;
  @Field({ nullable: true })
  email!: string;
  @Field({ nullable: true })
  hobby!: string;
  @Field({ nullable: true })
  name!: string;
  @Field({ nullable: true })
  phone!: string;
  @Field({ nullable: true })
  web!: string;
  @Field({ nullable: true })
  cv!: string;
  @Field({ nullable: true })
  sitemap!: string;
  @Field({ nullable: true })
  media_kit!: string;
  @Field({ nullable: true })
  slider_images!: string;
  @Field({ nullable: true })
  hide_experience!: boolean;
}
