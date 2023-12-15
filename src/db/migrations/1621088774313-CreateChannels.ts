import { MigrationInterface, QueryRunner, Table } from "typeorm";
import MigrationUtil from "../../utils/migrationUtil";

export class CreateChannels1621088774313 implements MigrationInterface {
  private static readonly table = new Table({
    name: "channels",
    columns: [
      ...MigrationUtil.getIDColumn(true),
      MigrationUtil.getVarCharColumn({ name: "icon" }),
      MigrationUtil.getVarCharColumn({ name: "url" }),
      { name: "visible", type: "boolean", default: false },
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
    await queryRunner.createTable(CreateChannels1621088774313.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(CreateChannels1621088774313.table);
  }
}
