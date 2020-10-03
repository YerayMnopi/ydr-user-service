import {MigrationInterface, QueryRunner} from "typeorm";

export class deleteAt1601078120679 implements MigrationInterface {
    name = 'deleteAt1601078120679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "deletedAt" date`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT '"2020-09-25T23:55:21.182Z"'`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone" SET DEFAULT null`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone" SET DEFAULT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "createdAt" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`, undefined);
    }

}
