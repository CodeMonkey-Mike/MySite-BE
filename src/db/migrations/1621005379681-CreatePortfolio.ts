import { MigrationInterface, QueryRunner, Table } from "typeorm";
import MigrationUtil from "../../utils/migrationUtil";

export class CreatePortfolio1621005379681 implements MigrationInterface {
  private static readonly table = new Table({
    name: "portfolios",
    columns: [
      ...MigrationUtil.getIDColumn(true),
      MigrationUtil.getVarCharColumn({ name: "type" }),
      MigrationUtil.getTextColumn({ name: "description" }),
      MigrationUtil.getVarCharColumn({ name: "logo" }),
      MigrationUtil.getVarCharColumn({ name: "client" }),
      MigrationUtil.getVarCharColumn({ name: "category" }),
      MigrationUtil.getVarCharColumn({ name: "url" }),
      MigrationUtil.getVarCharColumn({ name: "year" }),
      MigrationUtil.getVarCharColumn({ name: "detail" }),
      MigrationUtil.getVarCharColumn({ name: "facebook" }),
      MigrationUtil.getVarCharColumn({ name: "twitter" }),
      MigrationUtil.getVarCharColumn({ name: "pinterest" }),
      MigrationUtil.getVarCharColumn({ name: "linkedin" }),
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
    await queryRunner.createTable(CreatePortfolio1621005379681.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(CreatePortfolio1621005379681.table);
  }
}
