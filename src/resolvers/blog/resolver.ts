import {
  Resolver,
  Query,
  FieldResolver,
  ObjectType,
  Field,
  Mutation,
  Arg,
  Ctx,
  Int,
  Args,
} from "type-graphql";
import { Context } from "koa";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { getConnection, ILike } from "typeorm";
import Blog from "../../db/entities/blog.entity";
import { FieldError } from "../../utils/fieldError";
import { Upload } from "../../utils/upload";
import BlogTypes, { PaginationArgs } from "./types";
import { PostTypes } from "../../commonTypes/PostTypes";
import slugify from "slugify";

@ObjectType()
export class PageInfo {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageSize: number;

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  totalPages: number;
}

@ObjectType()
class PostsResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => [Blog], { nullable: true })
  posts?: Blog[];

  @Field(() => PageInfo, { nullable: true })
  pageInfo?: PageInfo;
}

@ObjectType()
class PostResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Blog, { nullable: true })
  post?: Blog;
}

@Resolver(Blog)
export class BlogResolver {
  @FieldResolver(() => String)

  // Get post
  @Query(() => PostResponse, { nullable: true })
  async getPostBySlug(@Arg("slug") slug: string): Promise<PostResponse> {
    const post = await Blog.findOne({
      where: {
        slug,
      },
      order: {
        slug: "ASC",
      },
    });
    return { post };
  }

  // Get post
  @Query(() => PostResponse, { nullable: true })
  async getPost(@Arg("id") id: number): Promise<PostResponse> {
    const post = await Blog.findOne({
      where: {
        id,
      },
      order: {
        id: "ASC",
      },
    });
    return { post };
  }

  // Get posts
  @Query(() => PostsResponse, { nullable: true })
  async getPosts(
    @Args()
    { page, pageSize, tag, category }: PaginationArgs
  ): Promise<PostsResponse> {
    let where = {};
    if (tag) {
      where = {
        tags: ILike(`%${tag}%`),
      };
    }
    if (category) {
      where = {
        ...where,
        category,
      };
    }
    const posts = await Blog.find({
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: {
        id: "DESC",
      },
      where: {
        ...where,
        status: PostTypes.PUBLIC,
      },
    });
    const postCount = await Blog.count();
    return {
      posts,
      pageInfo: {
        page,
        pageSize,
        total: postCount,
        totalPages: Math.ceil(postCount / pageSize),
      },
    };
  }

  // Get all posts
  @Query(() => PostsResponse, { nullable: true })
  async getAllPosts(
    @Args()
    { page, pageSize }: PaginationArgs
  ): Promise<PostsResponse> {
    const posts = await Blog.find({
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: {
        id: "DESC",
      },
    });
    const postCount = await Blog.count();
    return {
      posts,
      pageInfo: {
        page,
        pageSize,
        total: postCount,
        totalPages: Math.ceil(postCount / pageSize),
      },
    };
  }
  // create new post
  @Mutation(() => PostsResponse)
  async createPost(
    @Arg("options") options: BlogTypes,
    @Arg("file", () => GraphQLUpload, { nullable: true }) file: FileUpload,
    @Ctx() { ctx }: Context
  ): Promise<PostsResponse> {
    let params = {
      ...options,
      slug: slugify(options.title, {
        lower: true,
        strict: true,
      }),
    };
    try {
      if (file) {
        await Upload(file, async (url: string) => {
          params = {
            ...params,
            image: ctx.request.origin + url,
          };
        });
      }

      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Blog)
        .values(params)
        .returning("*")
        .execute();

      const posts = await Blog.find({
        order: {
          id: "DESC",
        },
      });
      return { posts };
    } catch (err) {
      throw new Error(err);
    }
  }
  // delete new post
  @Mutation(() => PostsResponse)
  async deletePost(@Arg("id") id: number) {
    const post = await Blog.find({
      where: {
        id: id,
      },
    });
    await Blog.remove(post);
    const posts = await Blog.find({
      order: {
        id: "DESC",
      },
    });
    return { posts };
  }
  // update post
  @Mutation(() => PostsResponse)
  async updatePost(
    @Arg("options") options: BlogTypes,
    @Arg("file", () => GraphQLUpload, { nullable: true }) file: FileUpload,
    @Ctx() { ctx }: Context
  ) {
    if (!file) {
      await Blog.update(
        {
          id: options.id,
        },
        {
          ...options,
          slug: slugify(options.slug, {
            lower: true,
            strict: true,
          }),
        }
      );
    } else {
      await Upload(file, async (url: string) => {
        await Blog.update(
          {
            id: options.id,
          },
          {
            ...options,
            slug: slugify(options.slug, {
              lower: true,
              strict: true,
            }),
            image: ctx.request.origin + url,
          }
        );
      });
    }
    const posts = await Blog.find({
      order: {
        id: "DESC",
      },
    });
    return { posts };
  }
  // publish draft posts
  @Mutation(() => PostsResponse)
  async publishPosts() {
    const draftPosts = await Blog.find({
      where: {
        status: PostTypes.DRAFT,
      },
    });
    if (!!draftPosts.length) {
      await Promise.all([
        draftPosts.forEach(async (post) => {
          await Blog.update(
            {
              id: post.id,
            },
            {
              status: PostTypes.PUBLIC,
            }
          );
        }),
      ]);
      console.log(
        `Blog-schedule: ${draftPosts.length} post(s) has been published!`
      );
    } else {
      console.log("Blog-schedule: No posts need to publish!");
    }
    const posts = await Blog.find();
    return { posts };
  }
}
