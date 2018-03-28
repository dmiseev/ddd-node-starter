import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../User/User';

@Entity('images')
export class Image {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'name', type: 'varchar', length: 255, nullable: false})
    name: string;

    @Column({name: 'path', type: 'varchar', length: 255, nullable: false})
    path: string;

    @Column({name: 'created_at', type: 'timestamp', nullable: false})
    createdAt: Date;

    @ManyToOne(type => User, user => user.images, {onDelete: 'SET NULL'})
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user: User;

    constructor(user: User, name: string, path: string, createdAt: Date) {
        this.user = user;
        this.name = name;
        this.path = path;
        this.createdAt = createdAt;
    }

    /**
     * @param {User} user
     * @param {string} name
     * @param {string} path
     *
     * @returns {Image}
     */
    static register(user: User, name: string, path: string): Image {
        return new Image(user, name, path, new Date());
    }
}