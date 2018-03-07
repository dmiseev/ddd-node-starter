import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Image } from '../Image/Image';

@Entity('users')
@Index('users_email_sequence', ['email'], {unique: true})
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'email',
        type: 'varchar',
        length: 255,
        nullable: false
    })
    email: string;

    @Exclude()
    @Column({
        name: 'password',
        type: 'varchar',
        length: 60,
        nullable: false
    })
    password: string;

    @Column({
        name: 'first_name',
        type: 'varchar',
        length: 255,
        nullable: false
    })
    firstName: string;

    @Column({
        name: 'last_name',
        type: 'varchar',
        length: 255,
        nullable: false
    })
    lastName: string;

    @Column({
        name: 'is_active',
        type: 'boolean',
        default: false
    })
    isActive: string;

    @Column({
        name: 'created_at',
        type: 'timestamp',
        nullable: false
    })
    createdAt: Date;

    @OneToMany(type => Image, image => image.user)
    images: Image[];

    constructor(email: string, password: string, firstName: string, lastName: string, createdAt: Date) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.createdAt = createdAt;
    }

    /**
     * @param {string} email
     * @param {string} password
     * @param {string} firstName
     * @param {string} lastName
     *
     * @returns {User}
     */
    static register(email: string, password: string, firstName: string, lastName: string) {
        return new User(email, password, firstName, lastName, new Date());
    }
}