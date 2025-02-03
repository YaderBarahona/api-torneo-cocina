export default class InitDatabase1738567409015 {
    name = 'InitDatabase1738567409015'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "chefs" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "specialty" text NOT NULL, "experienceYears" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "tournaments" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "location" text NOT NULL, "maxChefs" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "tournament_chefs" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "score" integer, "tournamentId" integer, "chefId" integer)`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "tournament_categories" ("tournamentId" integer NOT NULL, "categoryId" integer NOT NULL, PRIMARY KEY ("tournamentId", "categoryId"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "temporary_tournament_chefs" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "score" integer, "tournamentId" integer, "chefId" integer, CONSTRAINT "FK_a3d6f490c12366b6de479ddc16d" FOREIGN KEY ("tournamentId") REFERENCES "tournaments" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_5f4e86c7cc522fd7a9bfb056be3" FOREIGN KEY ("chefId") REFERENCES "chefs" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_tournament_chefs"("id", "score", "tournamentId", "chefId") SELECT "id", "score", "tournamentId", "chefId" FROM "tournament_chefs"`);
        await queryRunner.query(`DROP TABLE "tournament_chefs"`);
        await queryRunner.query(`ALTER TABLE "temporary_tournament_chefs" RENAME TO "tournament_chefs"`);
        await queryRunner.query(`CREATE TABLE "temporary_tournament_categories" ("tournamentId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "FK_c737e3711b68b14e94360f7fbc6" FOREIGN KEY ("tournamentId") REFERENCES "tournaments" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_a62f19491dcab8aa59a32f401db" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("tournamentId", "categoryId"))`);
        await queryRunner.query(`INSERT INTO "temporary_tournament_categories"("tournamentId", "categoryId") SELECT "tournamentId", "categoryId" FROM "tournament_categories"`);
        await queryRunner.query(`DROP TABLE "tournament_categories"`);
        await queryRunner.query(`ALTER TABLE "temporary_tournament_categories" RENAME TO "tournament_categories"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "tournament_categories" RENAME TO "temporary_tournament_categories"`);
        await queryRunner.query(`CREATE TABLE "tournament_categories" ("tournamentId" integer NOT NULL, "categoryId" integer NOT NULL, PRIMARY KEY ("tournamentId", "categoryId"))`);
        await queryRunner.query(`INSERT INTO "tournament_categories"("tournamentId", "categoryId") SELECT "tournamentId", "categoryId" FROM "temporary_tournament_categories"`);
        await queryRunner.query(`DROP TABLE "temporary_tournament_categories"`);
        await queryRunner.query(`ALTER TABLE "tournament_chefs" RENAME TO "temporary_tournament_chefs"`);
        await queryRunner.query(`CREATE TABLE "tournament_chefs" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "score" integer, "tournamentId" integer, "chefId" integer)`);
        await queryRunner.query(`INSERT INTO "tournament_chefs"("id", "score", "tournamentId", "chefId") SELECT "id", "score", "tournamentId", "chefId" FROM "temporary_tournament_chefs"`);
        await queryRunner.query(`DROP TABLE "temporary_tournament_chefs"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "tournament_categories"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "tournament_chefs"`);
        await queryRunner.query(`DROP TABLE "tournaments"`);
        await queryRunner.query(`DROP TABLE "chefs"`);
    }
}
