import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { PostTypes } from "../../commonTypes/PostTypes";
import MigrationUtil from "../../utils/migrationUtil";

export class CreateBlog1669565863369 implements MigrationInterface {
  private static readonly table = new Table({
    name: "blog",
    columns: [
      ...MigrationUtil.getIDColumn(true),
      MigrationUtil.getTextColumn({ name: "title" }),
      MigrationUtil.getTextColumn({ name: "image" }),
      MigrationUtil.getTextColumn({ name: "content" }),
      {
        name: "status",
        type: "enum",
        enum: [PostTypes.PUBLIC, PostTypes.DRAFT],
      },
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
    await queryRunner.createTable(CreateBlog1669565863369.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(CreateBlog1669565863369.table);
  }
}
