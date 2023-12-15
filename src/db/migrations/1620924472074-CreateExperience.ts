import { MigrationInterface, QueryRunner, Table } from "typeorm";
import MigrationUtil from "../../utils/migrationUtil";

export class CreateExperience1620924472074 implements MigrationInterface {
  private static readonly table = new Table({
    name: "experiences",
    columns: [
      ...MigrationUtil.getIDColumn(true),
      MigrationUtil.getVarCharColumn({ name: "company" }),
      { name: "current", type: "boolean", default: false },
      MigrationUtil.getTextColumn({ name: "description" }),
      MigrationUtil.getNumberColumn({ name: "endMonth" }),
      MigrationUtil.getNumberColumn({ name: "endYear" }),
      MigrationUtil.getNumberColumn({ name: "sequence" }),
      MigrationUtil.getNumberColumn({ name: "startMonth" }),
      MigrationUtil.getNumberColumn({ name: "startYear" }),
      MigrationUtil.getVarCharColumn({ name: "title" }),
      MigrationUtil.getVarCharColumn({ name: "website" }),
      MigrationUtil.getTextColumn({ name: "website_url" }),
      {
        name: "created_at",
        type: "timestamp with time zone",
        default: "timezone('utc'::text, now())",
      },
      {
        name: "updated_at",
        type: "timestamp with time zone",
        default: "timezone('utc'::text, now())",
      },
    ],
  });
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(CreateExperience1620924472074.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(CreateExperience1620924472074.table);
  }
}
