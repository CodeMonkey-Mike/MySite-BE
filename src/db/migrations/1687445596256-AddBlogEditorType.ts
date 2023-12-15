import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddBlogEditorType1687445596256 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "blog",
      new TableColumn({
        name: "editor_type",
        type: "text",
        isNullable: true,
      })
    );
    // Update 'slug' of existing blog
    const posts = await queryRunner.query("SELECT * FROM public.blog");
    for (const post of posts) {
      await queryRunner.query(
        `UPDATE public.blog SET "editor_type"='${"code-editor"}' WHERE "id"=${
          post.id
        }`
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("blog", "editor_type");
  }
}
