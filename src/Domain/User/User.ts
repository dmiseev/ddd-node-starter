import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'email', type: 'varchar', length: 255, nullable: false})
    email: string;

    @Column({name: 'first_name', type: 'varchar', length: 255, nullable: false})
    firstName: string;

    @Column({name: 'last_name', type: 'varchar', length: 255, nullable: false})
    lastName: string;

    constructor(email: string, firstName: string, lastName: string) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    /**
     * @param {string} email
     * @param {string} firstName
     * @param {string} lastName
     *
     * @returns {User}
     */
    static register(email: string, firstName: string, lastName: string) {
        return new User(email, firstName, lastName);
    }
}