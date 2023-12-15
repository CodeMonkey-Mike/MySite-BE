import {
  Resolver,
  Query,
  ObjectType,
  Field,
  Mutation,
  Arg,
  Ctx,
} from "type-graphql";
import { Context } from "koa";
import { getConnection } from "typeorm";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { FieldError } from "../../utils/fieldError";
import Services from "../../db/entities/services.entity";
import ServicesTypes from "./types";
import { Upload } from "../../utils/upload";

@ObjectType()
class ServicesResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => [Services], { nullable: true })
  services?: Services[];
}

@Resolver(Services)
export class ServicesResolver {
  // Get services
  @Query(() => ServicesResponse, { nullable: true })
  async getServices(): Promise<ServicesResponse> {
    const services = await Services.find({
      order: {
        id: "ASC",
      },
    });
    return { services };
  }

  // create new role
  @Mutation(() => ServicesResponse)
  async createService(
    @Arg("options") options: ServicesTypes,
    @Arg("file", () => GraphQLUpload, { nullable: true }) file: FileUpload,
    @Ctx() { ctx }: Context
  ): Promise<ServicesResponse> {
    try {
      await Upload(file, async (url: string) => {
        await getConnection()
          .createQueryBuilder()
          .insert()
          .into(Services)
          .values({ ...options, image: ctx.request.origin + url })
          .returning("*")
          .execute();
      });
      const services = await Services.find({
        order: {
          id: "ASC",
        },
      });
      return { services };
    } catch (err) {
      throw new Error(err);
    }
  }
  // delete new role
  @Mutation(() => ServicesResponse)
  async deleteService(@Arg("id") id: number) {
    const service = await Services.find({
      where: {
        id: id,
      },
    });
    await Services.remove(service);
    const services = await Services.find({
      order: {
        id: "ASC",
      },
    });
    return { services };
  }
  // update role
  @Mutation(() => ServicesResponse)
  async updateService(
    @Arg("options") options: ServicesTypes,
    @Arg("file", () => GraphQLUpload, { nullable: true }) file: FileUpload,
    @Ctx() { ctx }: Context
  ) {
    if (!file) {
      await Services.update(
        {
          id: options.id,
        },
        { ...options }
      );
    } else {
      await Upload(file, async (url: string) => {
        await Services.update(
          {
            id: options.id,
          },
          { ...options, image: ctx.request.origin + url }
        );
      });
    }
    const services = await Services.find({
      order: {
        id: "ASC",
      },
    });
    return { services };
  }
}
