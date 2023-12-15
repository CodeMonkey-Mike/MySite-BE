import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddBlogAuthor1676387581012 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "blog",
      new TableColumn({
        name: "author",
        type: "text",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("blog", "author");
  }
}
