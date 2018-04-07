import { FriendRequest } from '../Domain/FriendRequest/FriendRequest';
import { Image } from '../Domain/Image/Image';
import { User } from '../Domain/User/User';
import { InitMigration1522414949149 } from '../database/migrations/1522414949149-InitMigration';
import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.load();

export function createConnectionOptions(): ConnectionOptions {

    return {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [
            User, Image, FriendRequest
        ],
        synchronize: true,
        logging: false,
        migrations: [
            InitMigration1522414949149
        ],
    };
}