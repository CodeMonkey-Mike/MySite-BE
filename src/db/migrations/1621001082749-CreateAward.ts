import { MigrationInterface, QueryRunner, Table } from "typeorm";
import MigrationUtil from "../../utils/migrationUtil";

export class CreateAward1621001082749 implements MigrationInterface {
  private static readonly table = new Table({
    name: "awards",
    columns: [
      ...MigrationUtil.getIDColumn(true),
      MigrationUtil.getVarCharColumn({ name: "awardTime" }),
      MigrationUtil.getVarCharColumn({ name: "company" }),
      MigrationUtil.getVarCharColumn({ name: "image" }),
      MigrationUtil.getVarCharColumn({ name: "title" }),
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
    await queryRunner.createTable(CreateAward1621001082749.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(CreateAward1621001082749.table);
  }
}
