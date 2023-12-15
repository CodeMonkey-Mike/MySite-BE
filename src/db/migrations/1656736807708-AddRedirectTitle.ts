import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddRedirectTitle1656736807708 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "youtubes",
      new TableColumn({
        name: "title",
        type: "text",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("youtubes", "title");
  }
}
