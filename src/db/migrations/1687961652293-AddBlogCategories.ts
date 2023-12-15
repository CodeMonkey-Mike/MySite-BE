import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddBlogCategories1687961652293 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "blog",
      new TableColumn({
        name: "category",
        type: "text",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("blog", "category");
  }
}
