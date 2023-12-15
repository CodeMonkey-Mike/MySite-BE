import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddSliderImages1676297948801 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "profile",
      new TableColumn({
        name: "slider_images",
        type: "text",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("profile", "slider_images");
  }
}
