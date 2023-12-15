import { FileUpload } from "graphql-upload";
import path from "path";
import fs from "fs";

export async function Upload(
  file: FileUpload,
  cb: (url: string) => Promise<void>
) {
  const { createReadStream, filename } = await file;
  const fileNameParse = filename.split(".");
  const fileUploadName = `${fileNameParse[0]}_${new Date().getTime()}.${
    fileNameParse[1]
  }`;
  const stream = createReadStream();
  const pathName = path.join(
    __dirname + `../../../public/assets/uploads/${fileUploadName}`
  );
  const writeStream = fs.createWriteStream(pathName);
  return new Promise((resolve, reject) =>
    stream
      .pipe(writeStream)
      .on("finish", async () => {
        await cb(`/assets/uploads/${fileUploadName}`);
        resolve(true);
      })
      .on("error", (error) => {
        writeStream.destroy(error);
        reject();
      })
  );
}
