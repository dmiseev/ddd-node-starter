import { createConnection, MigrationInterface } from 'typeorm';
import { User } from '../Domain/User/User';
import { UserFactory } from '../database/fixtures/UserFactory';
import { FriendRequest } from '../Domain/FriendRequest/FriendRequest';
import { Image } from '../Domain/Image/Image';
import { Connection } from 'typeorm/connection/Connection';
import { InitMigration1522414949149 } from '../database/migrations/1522414949149-InitMigration';

export const environment = {
    baseUrl: 'http://localhost:3123',
    apiVersion: '/api/v1',
    email: 'alex.clare@test.com',
    password: 'testpass'
};

// TODO: move all static to .env file

const getConnection: Promise<Connection> = createConnection({
    name: 'test',
    type: 'postgres',
    host: '192.168.1.103',
    port: 5411,
    username: 'starter_user',
    password: 'Eh7gLagHHHzK2h7j',
    database: 'starter_db',
    entities: [
        User, Image, FriendRequest
    ],
    synchronize: true,
    logging: false,
    migrations: [
        InitMigration1522414949149
    ],
});

// Down and Up migrations with fixtures
export function rollbackMigrations(done) {

    getConnection.then(connection => {
        connection.migrations.forEach((migration: MigrationInterface) => {
            migration.down(connection.createQueryRunner()).then(() => {
                migration.up(connection.createQueryRunner()).then(() => {
                    connection.manager.save(UserFactory.fakeUsers()).then((users: User[]) => {
                        done();
                    });
                });
            });
        });
    });
}