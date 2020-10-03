import {MigrationInterface, QueryRunner} from "typeorm";

export class updateNotNull1601153450611 implements MigrationInterface {
    name = 'updateNotNull1601153450611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT '"2020-09-26T20:50:50.926Z"'`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updatedAt" SET DEFAULT '"2020-09-26T20:50:50.927Z"'`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone" SET DEFAULT null`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone" SET DEFAULT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updatedAt" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT '2020-09-25'`, undefined);
    }

}
