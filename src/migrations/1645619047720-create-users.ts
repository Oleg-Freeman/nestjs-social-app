import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsers1645619047720 implements MigrationInterface {
  name = 'createUsers1645619047720';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying(255) NOT NULL, "lastName" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "isDeleted" boolean NOT NULL DEFAULT true, "birthDay" date, "bio" character varying(255), "website" character varying(255), "location" character varying(255), "phone" character varying(255), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
