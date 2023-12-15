import { MigrationInterface, QueryRunner, Table } from "typeorm";
import MigrationUtil from "../../utils/migrationUtil";

export class AddPoll1699462225673 implements MigrationInterface {
  private static readonly table = new Table({
    name: "poll",
    columns: [
      ...MigrationUtil.getIDColumn(true),
      MigrationUtil.getTextColumn({ name: "title" }),
      MigrationUtil.getTextColumn({ name: "topic" }),
      MigrationUtil.getVarCharColumn({ name: "category" }),
      MigrationUtil.getTextColumn({ name: "options" }),
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
    await queryRunner.createTable(AddPoll1699462225673.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(AddPoll1699462225673.table);
  }
}
