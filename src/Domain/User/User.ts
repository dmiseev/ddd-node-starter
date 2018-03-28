import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Image } from '../Image/Image';

@Entity('users')
@Index('users_email_deleted_sequence', ['email', 'deletedAt'], {unique: true})
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
        nullable: false
    })
    isActive: boolean;

    @Column({
        name: 'created_at',
        type: 'timestamp',
        nullable: false
    })
    createdAt: Date;

    @Exclude()
    @Column({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true
    })
    deletedAt: Date;

    @OneToMany(type => Image, image => image.user)
    images: Image[];

    @ManyToMany(type => User)
    @JoinTable({
        name: 'users_friends',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'friend_id',
            referencedColumnName: 'id'
        }
    })
    friends: User[];

    constructor(email: string, password: string, firstName: string, lastName: string, createdAt: Date) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.isActive = false;
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
    static register(email: string, password: string, firstName: string, lastName: string): User {
        return new User(email, password, firstName, lastName, new Date());
    }

    public remove(): void {
        this.deletedAt = new Date();
    }

    /**
     * @param {User} user
     * @return boolean
     */
    public isFriend(user: User): boolean {

        if (!this.friends) {
            return false;
        }

        let friends = this.friends.filter((friend: User) => {
            return friend.id === user.id;
        });

        return !!friends;
    }

    /**
     * @param {User} friend
     */
    public addFriend(friend: User): void {

        if (this.isFriend(friend)) {
            return;
        }

        if (!this.friends) {
            this.friends = [];
        }

        this.friends.push(friend);
    }
}