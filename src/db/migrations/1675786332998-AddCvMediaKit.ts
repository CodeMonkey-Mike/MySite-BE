import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddCvMediaKit1675786332998 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "profile",
      new TableColumn({
        name: "cv",
        type: "text",
        isNullable: true,
      })
    );
    await queryRunner.addColumn(
      "profile",
      new TableColumn({
        name: "media_kit",
        type: "text",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("profile", "cv");
    await queryRunner.dropColumn("profile", "media_kit");
  }
}
