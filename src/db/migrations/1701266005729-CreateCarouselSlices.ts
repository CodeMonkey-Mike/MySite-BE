import { MigrationInterface, QueryRunner, Table } from "typeorm";
import MigrationUtil from "../../utils/migrationUtil";

export class CreateCarouselSlides1701266005729 implements MigrationInterface {
  private static readonly table = new Table({
    name: "carousel_slides",
    columns: [
      ...MigrationUtil.getIDColumn(true),
      MigrationUtil.getTextColumn({ name: "description" }),
      MigrationUtil.getTextColumn({ name: "hashtag" }),
      MigrationUtil.getNumberColumn({ name: "sequence" }),
      MigrationUtil.getNumberColumn({ name: "carousel_id" }),
      {
        name: "created_at",
        type: "timestamp with time zone",
        default: "timezone('utc'::text, now())",
      },
    ],
    foreignKeys: [
      {
        columnNames: ["carousel_id"],
        referencedTableName: "carousel",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      },
    ],
  });
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(CreateCarouselSlides1701266005729.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(CreateCarouselSlides1701266005729.table);
  }
}
