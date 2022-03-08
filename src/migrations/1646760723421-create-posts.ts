import { MigrationInterface, QueryRunner } from 'typeorm';

export class createPosts1646760723421 implements MigrationInterface {
  name = 'createPosts1646760723421';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "posts" (
                "id" SERIAL NOT NULL,
                "userId" INT NOT NULL CHECK("userId" > 0),
                "text" VARCHAR(255) NOT NULL,
                "isDeleted" boolean NOT NULL DEFAULT false,
                "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                
                CONSTRAINT "PK_postId" PRIMARY KEY ("id"),
                CONSTRAINT "FK_userId" FOREIGN KEY("userId") REFERENCES users("id")
    )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "posts" CASCADE`);
  }
}
