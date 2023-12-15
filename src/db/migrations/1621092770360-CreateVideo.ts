import { MigrationInterface, QueryRunner, Table } from "typeorm";
import MigrationUtil from "../../utils/migrationUtil";

export class CreateVideo1621092770360 implements MigrationInterface {
  private static readonly table = new Table({
    name: "video",
    columns: [
      ...MigrationUtil.getIDColumn(true),
      MigrationUtil.getVarCharColumn({ name: "title" }),
      MigrationUtil.getVarCharColumn({ name: "url" }),
      { name: "visible", type: "boolean", default: false },
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
    await queryRunner.createTable(CreateVideo1621092770360.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(CreateVideo1621092770360.table);
  }
}
