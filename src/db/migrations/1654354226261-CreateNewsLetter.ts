import { MigrationInterface, QueryRunner, Table } from "typeorm";
import MigrationUtil from "../../utils/migrationUtil";

export class CreateNewsLetter1654354226261 implements MigrationInterface {
  private static readonly table = new Table({
    name: "newsletter",
    columns: [
      ...MigrationUtil.getIDColumn(true),
      MigrationUtil.getVarCharColumn({ name: "email", isUnique: true }),
      MigrationUtil.getVarCharColumn({ name: "topics" }),
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
    await queryRunner.createTable(CreateNewsLetter1654354226261.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(CreateNewsLetter1654354226261.table);
  }
}
