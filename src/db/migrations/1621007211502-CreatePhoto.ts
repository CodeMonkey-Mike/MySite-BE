import { MigrationInterface, QueryRunner, Table } from "typeorm";
import MigrationUtil from "../../utils/migrationUtil";

export class CreatePhoto1621007211502 implements MigrationInterface {
  private static readonly table = new Table({
    name: "photo",
    columns: [
      ...MigrationUtil.getIDColumn(true),
      MigrationUtil.getVarCharColumn({ name: "url" }),
      MigrationUtil.getNumberColumn({ name: "parent_id" }),
      MigrationUtil.getVarCharColumn({ name: "category" }),
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
    foreignKeys: [
      {
        columnNames: ["parent_id"],
        referencedTableName: "portfolios",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      },
    ],
  });
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(CreatePhoto1621007211502.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(CreatePhoto1621007211502.table);
  }
}
