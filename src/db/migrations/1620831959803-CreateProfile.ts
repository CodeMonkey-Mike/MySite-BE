import MigrationUtil from "../../utils/migrationUtil";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProfile1620831959803 implements MigrationInterface {
  private static readonly table = new Table({
    name: "profile",
    columns: [
      ...MigrationUtil.getIDColumn(true),
      MigrationUtil.getVarCharColumn({ name: "address" }),
      MigrationUtil.getVarCharColumn({ name: "address1" }),
      MigrationUtil.getTextColumn({ name: "bio" }),
      MigrationUtil.getVarCharColumn({ name: "birthPlace" }),
      MigrationUtil.getVarCharColumn({ name: "dob" }),
      MigrationUtil.getVarCharColumn({ name: "email" }),
      MigrationUtil.getVarCharColumn({ name: "hobby" }),
      MigrationUtil.getVarCharColumn({ name: "name" }),
      MigrationUtil.getVarCharColumn({ name: "phone" }),
      MigrationUtil.getVarCharColumn({ name: "web" }),
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
    await queryRunner.createTable(CreateProfile1620831959803.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(CreateProfile1620831959803.table);
  }
}
