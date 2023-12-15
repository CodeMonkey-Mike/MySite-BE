import { MigrationInterface, QueryRunner, Table } from "typeorm";
import MigrationUtil from "../../utils/migrationUtil";
import NewsLetterTopics from "../entities/newsletterTopics.entity";

export class CreateNewsLetterTopics1654352422777 implements MigrationInterface {
  private static readonly table = new Table({
    name: "newsletter_topics",
    columns: [
      ...MigrationUtil.getIDColumn(true),
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
    await queryRunner.createTable(CreateNewsLetterTopics1654352422777.table);
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(NewsLetterTopics)
      .values([
        { title: "Epic Videos" },
        { title: "Saving and Investing" },
        { title: "Economic Uncertainties" },
        { title: "Credit Cards" },
        { title: "Internet Marketing" },
        { title: "Crypto" },
        { title: "Inspirational" },
        { title: "About CodeMonkey Mike & vlogs" },
        { title: "Shorts" },
      ])
      .returning("*")
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(CreateNewsLetterTopics1654352422777.table);
  }
}
