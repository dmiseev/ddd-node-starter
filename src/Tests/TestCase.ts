import { createConnection, MigrationInterface } from 'typeorm';

// Down and Up migrations with fixtures
export function rollbackMigrations(done) {

    createConnection().then(async connection => {

        connection.migrations.forEach((migration: MigrationInterface) => {

            migration.down(connection.createQueryRunner()).then(() => {

                migration.up(connection.createQueryRunner()).then(() => {
                    done();
                });
            });
        });
    });
}