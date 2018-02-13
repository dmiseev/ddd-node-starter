import { User } from './User';

export interface UserRepository {

    /**
     * @returns {Promise<User>}
     */
    all(): Promise<User[]>;

    /**
     * @param {number} id
     * @returns {Promise<User>}
     */
    byId(id: number): Promise<User>;

    /**
     * @param {User} user
     */
    store(user: User): Promise<User>;
}