import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddExperienceGlobalHidden1676210648598
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "profile",
      new TableColumn({
        name: "hide_experience",
        type: "boolean",
        isNullable: true,
        default: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("profile", "hide_experience");
  }
}
