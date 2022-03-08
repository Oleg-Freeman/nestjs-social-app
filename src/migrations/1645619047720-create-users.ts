import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsers1645619047720 implements MigrationInterface {
  name = 'createUsers1645619047720';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "firstName" VARCHAR(255) NOT NULL,
                "lastName" VARCHAR(255) NOT NULL,
                "email" VARCHAR(255) NOT NULL UNIQUE,
                "password" VARCHAR(255) NOT NULL,
                "isDeleted" boolean NOT NULL DEFAULT false,
                "birthDay" date,
                "bio" VARCHAR(255),
                "website" VARCHAR(255),
                "location" VARCHAR(255),
                "phone" VARCHAR(255) UNIQUE,
                "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                
                CONSTRAINT "PK_cace4a159ff9f2512dd42373761" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users" CASCADE`);
  }
}
