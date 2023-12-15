import {
  Resolver,
  Query,
  ObjectType,
  Field,
  Mutation,
  Arg,
  InputType,
  Ctx,
} from "type-graphql";
import { getConnection } from "typeorm";
import { GraphQLUpload, FileUpload } from "graphql-upload";
import { FieldError } from "../../utils/fieldError";
import Photo from "../../db/entities/photo.entity";
import { Stream } from "stream";
import path from "path";
import fs from "fs";
import { Context } from "koa";

@ObjectType()
class PhotoResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => [Photo], { nullable: true })
  photos?: Photo[];
}

@InputType()
export class FileInput {
  @Field(() => Stream)
  stream: Stream;

  @Field() filename: string;

  @Field() mimetype: string;

  @Field() encoding: string;
}

@Resolver(Photo)
export class PhotoResolver {
  // Get photo
  @Query(() => PhotoResponse, { nullable: true })
  async getPhoto(
    @Arg("parent_id") parent_id: number,
    @Arg("category") category: string
  ): Promise<PhotoResponse> {
    const photos = await Photo.find({
      where: {
        parent_id: parent_id,
        category: category,
      },
    });
    return { photos };
  }

  // upload
  @Mutation(() => PhotoResponse)
  async uploadPhoto(
    @Arg("files", () => [GraphQLUpload]) files: FileUpload[],
    @Arg("parent_id") parent_id: number,
    @Arg("category") category: string,
    @Ctx() { ctx }: Context
  ): Promise<PhotoResponse> {
    try {
      await Promise.all(
        files.map(async (file) => {
          const { createReadStream, filename } = await file;
          const fileNameParse = filename.split(".");
          const fileUploadName = `${fileNameParse[0]}_${new Date().getTime()}.${
            fileNameParse[1]
          }`;
          const stream = createReadStream();
          const pathName = path.join(
            __dirname + `../../../../public/assets/uploads/${fileUploadName}`
          );
          const writeStream = fs.createWriteStream(pathName);
          return new Promise((resolve, reject) =>
            stream
              .pipe(writeStream)
              .on("finish", async () => {
                await getConnection()
                  .createQueryBuilder()
                  .insert()
                  .into(Photo)
                  .values({
                    url: `${ctx.request.origin}/assets/uploads/${fileUploadName}`,
                    parent_id: parent_id,
                    category: category,
                  })
                  .execute();
                return resolve(true);
              })
              .on("error", (error) => {
                writeStream.destroy(error);
                return reject();
              })
          );
        })
      );
      const photos = await Photo.find({
        where: {
          parent_id: parent_id,
          category: category,
        },
      });
      return { photos };
    } catch (err) {
      throw new Error(err);
    }
  }
  // delete new role
  @Mutation(() => Boolean)
  async deletePhoto(
    @Arg("id") id: number,
    @Arg("parent_id") parent_id: number,
    @Arg("category") category: string
  ) {
    const photo = await Photo.find({
      where: {
        id: id,
        parent_id: parent_id,
        category: category,
      },
    });
    await Photo.remove(photo);
    const photos = await Photo.find({
      where: {
        parent_id: parent_id,
        category: category,
      },
    });
    return { photos };
  }
}
