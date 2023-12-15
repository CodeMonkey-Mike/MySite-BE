import { MigrationInterface, QueryRunner, Table } from "typeorm";
import MigrationUtil from "../../utils/migrationUtil";

export class CreateYTTable1654964592454 implements MigrationInterface {
  private static readonly table = new Table({
    name: "youtubes",
    columns: [
      ...MigrationUtil.getIDColumn(true),
      MigrationUtil.getVarCharColumn({ name: "code", isNullable: true }),
      MigrationUtil.getVarCharColumn({ name: "url" }),
      MigrationUtil.getNumberColumn({ name: "sequence" }),
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
    await queryRunner.createTable(CreateYTTable1654964592454.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(CreateYTTable1654964592454.table);
  }
}
