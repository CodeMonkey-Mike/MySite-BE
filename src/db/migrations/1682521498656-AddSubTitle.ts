import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddSubTitle1682521498656 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "blog",
      new TableColumn({
        name: "anchor_title",
        type: "text",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("blog", "anchor_title");
  }
}
