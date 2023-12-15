import {
  Resolver,
  Query,
  FieldResolver,
  ObjectType,
  Field,
  Mutation,
  Arg,
  Ctx,
} from "type-graphql";
import { FieldError } from "../../utils/fieldError";
import Portfolios from "../../db/entities/portfolios.entity";
import PortfoliosTypes, { DPhoto } from "./types";
import { getConnection } from "typeorm";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Context } from "koa";
import { Upload } from "../../utils/upload";
import PhotoTypes from "../../resolvers/photo/types";
import Photo from "../../db/entities/photo.entity";
import { PhotoResolver } from "../../resolvers/photo/resolver";

@ObjectType()
class PortfoliosResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => [Portfolios], { nullable: true })
  portfolios?: Portfolios[];

  @Field(() => [Photo], { nullable: true })
  photos?: PhotoTypes[];
}

const PhotoRsv = new PhotoResolver();
@Resolver(Portfolios)
export class PortfoliosResolver {
  @FieldResolver(() => String)

  // Get portfolios
  @Query(() => PortfoliosResponse, { nullable: true })
  async getPortfolios(): Promise<PortfoliosResponse> {
    const portfolios = await Portfolios.find({
      order: {
        sequence: "ASC",
      },
    });
    return { portfolios };
  }

  // create new role
  @Mutation(() => PortfoliosResponse)
  async createPortfolio(
    @Arg("options") options: PortfoliosTypes,
    @Arg("file", () => GraphQLUpload, { nullable: true }) file: FileUpload,
    @Arg("gallery", () => [GraphQLUpload], { nullable: true })
    gallery: [FileUpload],
    @Ctx() { ctx }: Context
  ): Promise<PortfoliosResponse> {
    try {
      let n: any;

      await Upload(file, async (url: string) => {
        n = await getConnection()
          .createQueryBuilder()
          .insert()
          .into(Portfolios)
          .values({ ...options, logo: ctx.request.origin + url })
          .returning("*")
          .execute();
      });

      if (n.raw[0] && gallery) {
        /* @ts-ignore */
        await PhotoRsv.uploadPhoto(gallery, n.raw[0].id, "portfolio", { ctx });
      }
      const photos = await Photo.find({
        where: {
          parent_id: n.raw[0].id,
        },
      });
      const portfolios = await Portfolios.find({
        order: {
          sequence: "ASC",
        },
      });
      return { portfolios, photos };
    } catch (err) {
      throw new Error(err);
    }
  }
  // delete new role
  @Mutation(() => PortfoliosResponse)
  async deletePortfolio(@Arg("id") id: number) {
    const portfolio = await Portfolios.find({
      where: {
        id: id,
      },
    });
    await Portfolios.remove(portfolio);
    const portfolios = await Portfolios.find({
      order: {
        sequence: "ASC",
      },
    });
    return { portfolios };
  }
  // update role
  @Mutation(() => PortfoliosResponse)
  async updatePortfolio(
    @Arg("options") options: PortfoliosTypes,
    @Arg("file", () => GraphQLUpload, { nullable: true }) file: FileUpload,
    @Arg("gallery", () => [GraphQLUpload], { nullable: true })
    gallery: [FileUpload],
    @Arg("deleted_gl", () => [DPhoto], { nullable: true }) deleted_gl: [DPhoto],
    @Ctx() { ctx }: Context
  ) {
    if (file) {
      await Upload(file, async (url: string) => {
        await Portfolios.update(
          {
            id: options.id,
          },
          { ...options, logo: ctx.request.origin + url }
        );
      });
    } else {
      await Portfolios.update(
        {
          id: options.id,
        },
        { ...options }
      );
    }
    if (gallery) {
      /* @ts-ignore */
      await PhotoRsv.uploadPhoto(gallery, options.id, "portfolio", { ctx });
    }
    if (deleted_gl) {
      /* @ts-ignore */
      await Promise.all(
        deleted_gl.map(async (d_fl) => {
          return new Promise(async (rs) => {
            await PhotoRsv.deletePhoto(d_fl.id, d_fl.parent_id, d_fl.category);
            rs(true);
          });
        })
      );
    }

    const portfolios = await Portfolios.find({
      order: {
        sequence: "ASC",
      },
    });
    return { portfolios };
  }
  @Mutation(() => PortfoliosResponse)
  async bulkUpdatePortfolios(
    @Arg("options", () => [PortfoliosTypes]) options: PortfoliosTypes[]
  ) {
    options.forEach(async (portfolio: PortfoliosTypes) => {
      const oldPortfolio = await Portfolios.findOneOrFail(portfolio.id);
      Object.assign(oldPortfolio, portfolio);
      await oldPortfolio.save();
    });

    const portfolios = await Portfolios.find({
      order: {
        sequence: "ASC",
      },
    });
    return { portfolios };
  }
}
