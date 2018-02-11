import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('users')
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255, nullable: true})
    firstName: string;

    @Column({type: 'varchar', length: 255, nullable: true})
    lastName: string;

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    /**
     * @param {string} firstName
     * @param {string} lastName
     *
     * @returns {User}
     */
    static register(firstName: string, lastName: string) {
        return new User(firstName, lastName);
    }
}