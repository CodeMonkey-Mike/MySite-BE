import { Max, Min } from "class-validator";
import { InputType, Field, ArgsType, Int } from "type-graphql";
import { PostTypes } from "../../commonTypes/PostTypes";

@InputType()
export default class BlogTypes {
  @Field({ nullable: true })
  id!: number;
  @Field()
  title!: string;
  @Field()
  content!: string;
  @Field({ nullable: true })
  author!: string;
  @Field({ nullable: true })
  tags: string;
  @Field({ nullable: true })
  slug: string;
  @Field({ nullable: true })
  anchor_title: string;
  @Field({ nullable: true })
  editor_type: string;
  @Field({ nullable: true })
  category: string;
  @Field({ nullable: true })
  image!: string;
  @Field({ nullable: true, defaultValue: PostTypes.PUBLIC })
  status: PostTypes;
  @Field({ nullable: true })
  created_at: Date;
}

@ArgsType()
export class PaginationArgs {
  @Field((type) => Int, { defaultValue: 1, nullable: true })
  @Min(1)
  page: number;

  @Field((type) => Int, { defaultValue: 10, nullable: true })
  @Min(1)
  @Max(50)
  pageSize: number;

  @Field({ nullable: true })
  tag: string;

  @Field({ nullable: true })
  category: string;
}
