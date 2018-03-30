import {MigrationInterface, QueryRunner} from "typeorm";

export class InitMigration1522414949149 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "images" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "path" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL, "user_id" integer, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(60) NOT NULL, "first_name" character varying(255) NOT NULL, "last_name" character varying(255) NOT NULL, "is_active" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL, "deleted_at" TIMESTAMP, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "friend_requests" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL, "deleted_at" TIMESTAMP, "sender_id" integer, "receiver_id" integer, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "users_friends" ("user_id" integer NOT NULL, "friend_id" integer NOT NULL, PRIMARY KEY("user_id", "friend_id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "users_email_deleted_sequence" ON "users"("email","deleted_at")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "users_friends"`);
        await queryRunner.query(`DROP TABLE "friend_requests"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
