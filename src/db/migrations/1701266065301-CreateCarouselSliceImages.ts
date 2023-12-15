import { MigrationInterface, QueryRunner, Table } from "typeorm";
import MigrationUtil from "../../utils/migrationUtil";

export class CreateCarouselSlideImages1701266065301
  implements MigrationInterface
{
  private static readonly table = new Table({
    name: "carousel_slide_images",
    columns: [
      ...MigrationUtil.getIDColumn(true),
      MigrationUtil.getTextColumn({ name: "image_url" }),
      MigrationUtil.getNumberColumn({ name: "carousel_slide_id" }),
      { name: "chosen", type: "enum", enum: ["Y", "N"] },
      {
        name: "created_at",
        type: "timestamp with time zone",
        default: "timezone('utc'::text, now())",
      },
    ],
    foreignKeys: [
      {
        columnNames: ["carousel_slide_id"],
        referencedTableName: "carousel_slides",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      },
    ],
  });
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(CreateCarouselSlideImages1701266065301.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(CreateCarouselSlideImages1701266065301.table);
  }
}
