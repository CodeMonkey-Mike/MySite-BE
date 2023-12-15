import {
  Resolver,
  Query,
  FieldResolver,
  ObjectType,
  Field,
  Mutation,
  Arg,
} from "type-graphql";
import { ILike } from "typeorm";
import { FieldError } from "../../utils/fieldError";
import TagsTypes from "./types";
import Tags from "../../db/entities/tags.entity";
import Blog from "../../db/entities/blog.entity";

const kebabCase = (val: string) =>
  val
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();

@ObjectType()
class TagsResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => [Tags], { nullable: true })
  tags?: Tags[];
}

@Resolver(Tags)
export class TagsResolver {
  @FieldResolver(() => String)

  // Get tags
  @Query(() => TagsResponse, { nullable: true })
  async getTags(): Promise<TagsResponse> {
    const tags = await Tags.find();
    return { tags };
  }

  // create new tags
  @Mutation(() => TagsResponse)
  async createTag(@Arg("options") options: TagsTypes): Promise<TagsResponse> {
    try {
      const tagRepo = new Tags();
      tagRepo.title = options.title;
      tagRepo.slug = kebabCase(options.title);
      await tagRepo.save();
      const tags = await Tags.find();
      return { tags };
    } catch (err) {
      throw new Error(err);
    }
  }
  // delete new post
  @Mutation(() => TagsResponse)
  async deleteTag(@Arg("id") id: number) {
    const tag = await Tags.findOne({
      where: {
        id: id,
      },
    });
    if (tag) {
      const posts = await Blog.find({
        where: {
          tags: ILike(`%${tag.slug}%`),
        },
      });
      if (!!posts.length) {
        await Promise.all([
          posts.forEach(async (post) => {
            const oldTags = JSON.parse(post.tags);
            const newTags = oldTags.filter((tg: string) => tg !== tag.slug);
            await Blog.update(
              {
                id: post.id,
              },
              {
                tags: JSON.stringify(newTags),
              }
            );
          }),
        ]);
      }
      await Tags.remove(tag);
    }

    const tags = await Tags.find({
      order: {
        id: "ASC",
      },
    });
    return { tags };
  }
}
