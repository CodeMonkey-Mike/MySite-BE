import {
  Resolver,
  ObjectType,
  Field,
  Mutation,
  Arg,
  InputType,
  Ctx,
} from "type-graphql";
import { getConnection } from "typeorm";
import { GraphQLUpload, FileUpload } from "graphql-upload";
import fs from "fs";
import path from "path";
import { FieldError } from "../../utils/fieldError";
import File from "../../db/entities/files.entity";
import { Stream } from "stream";
import { Context } from "koa";
import { Upload } from "../../utils/upload";

@ObjectType()
class FileResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => File, { nullable: true })
  file?: File;
}

@InputType()
export class FileInput {
  @Field(() => Stream)
  stream: Stream;

  @Field() filename: string;

  @Field() mimetype: string;

  @Field() encoding: string;
}

@Resolver(File)
export class FileResolver {
  // upload
  @Mutation(() => FileResponse)
  async uploadFile(
    @Arg("file", () => GraphQLUpload, { nullable: true }) file: FileUpload,
    @Ctx() { ctx }: Context
  ): Promise<FileResponse> {
    try {
      let n: any;
      await Upload(file, async (url: string) => {
        n = await getConnection()
          .createQueryBuilder()
          .insert()
          .into(File)
          .values({ path: ctx.request.origin + url })
          .returning("*")
          .execute();
      });
      const fileUploaded = await File.findOne({
        where: {
          id: n.raw[0].id,
        },
      });
      return { file: fileUploaded };
    } catch (err) {
      throw new Error(err);
    }
  }
  // delete file
  @Mutation(() => Boolean)
  async deleteFile(
    @Arg("ids", () => [Number]) ids: number[],
    @Ctx() { ctx }: Context
  ) {
    const pathName = (filename: string) =>
      path.join(__dirname + `../../../../public${filename}`);

    try {
      if (!!ids.length) {
        ids.forEach(async (id: number) => {
          const file = await File.find({
            where: {
              id: id,
            },
          });
          console.log(
            "pathName:",
            pathName(file[0].path.replace(ctx.request.origin, ""))
          );
          fs.unlinkSync(pathName(file[0].path.replace(ctx.request.origin, "")));
          await File.remove(file);
        });
      }
      return true;
    } catch (err) {
      throw new Error(err);
    }
  }
}
