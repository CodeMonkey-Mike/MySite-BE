import slugify from "slugify";
import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddSlugColumnToBlog1681827559072 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "blog",
      new TableColumn({
        name: "slug",
        type: "text",
        isNullable: true,
      })
    );

    // Update 'slug' of existing blog
    const posts = await queryRunner.query("SELECT * FROM public.blog");
    for (const post of posts) {
      await queryRunner.query(
        `UPDATE public.blog SET "slug"='${slugify(post.title, {
          lower: true,
          strict: true,
        })}' WHERE "id"=${post.id}`
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("blog", "slug");
  }
}
