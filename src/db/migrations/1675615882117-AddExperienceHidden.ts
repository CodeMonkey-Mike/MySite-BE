import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddExperienceHidden1675615882117 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "experiences",
      new TableColumn({
        name: "hide",
        type: "boolean",
        isNullable: true,
        default: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("experiences", "hide");
  }
}
