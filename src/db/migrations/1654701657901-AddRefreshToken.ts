import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRefreshToken1654701657901 implements MigrationInterface {
  public async up(_: QueryRunner): Promise<void> {
    // await queryRunner.query(
    //   "ALTER TABLE public.user ADD COLUMN refresh_token text;"
    // );
    // await queryRunner.query(
    //   "ALTER TABLE public.user ADD COLUMN refresh_expires timestamp with time zone;"
    // );
    // await queryRunner.query(
    //   "CREATE INDEX refresh_token ON public.user USING btree (refresh_token ASC NULLS LAST);"
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP INDEX public.refresh_token;");
    await queryRunner.dropColumn("user", "refresh_token");
    await queryRunner.dropColumn("user", "refresh_expires");
  }
}
