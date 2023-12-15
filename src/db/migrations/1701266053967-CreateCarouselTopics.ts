import { MigrationInterface, QueryRunner, Table } from "typeorm";
import MigrationUtil from "../../utils/migrationUtil";

export class CreateCarouselTopics1701266053967 implements MigrationInterface {
  private static readonly table = new Table({
    name: "carousel_topics",
    columns: [
      ...MigrationUtil.getIDColumn(true),
      MigrationUtil.getTextColumn({ name: "topic" }),
      MigrationUtil.getTextColumn({ name: "content" }),
      {
        name: "created_at",
        type: "timestamp with time zone",
        default: "timezone('utc'::text, now())",
      },
    ],
  });
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(CreateCarouselTopics1701266053967.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(CreateCarouselTopics1701266053967.table);
  }
}
