import { MigrationInterface, QueryRunner, Table } from "typeorm";
import MigrationUtil from "../../utils/migrationUtil";

export class CreateEducation1620920797303 implements MigrationInterface {
  private static readonly table = new Table({
    name: "educations",
    columns: [
      ...MigrationUtil.getIDColumn(true),
      MigrationUtil.getVarCharColumn({ name: "degree" }),
      MigrationUtil.getTextColumn({ name: "description" }),
      MigrationUtil.getNumberColumn({ name: "endMonth" }),
      MigrationUtil.getNumberColumn({ name: "endYear" }),
      MigrationUtil.getVarCharColumn({ name: "location" }),
      MigrationUtil.getVarCharColumn({ name: "school" }),
      MigrationUtil.getNumberColumn({ name: "startMonth" }),
      MigrationUtil.getNumberColumn({ name: "startYear" }),
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
    await queryRunner.createTable(CreateEducation1620920797303.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(CreateEducation1620920797303.table);
  }
}
