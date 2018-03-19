import { User } from './User';
import { Pagination } from '../Core/Pagination';

export interface UserRepository {

    /**
     * @param {Pagination} pagination
     * @returns {Promise<[User[] , number]>}
     */
    all(pagination: Pagination): Promise<[User[], number]>;

    /**
     * @param {number} id
     * @returns {Promise<User>}
     */
    byId(id: number): Promise<User>;

    /**
     * @param {string} email
     * @returns {Promise<User>}
     */
    byEmail(email: string): Promise<User>;

    /**
     * @param {User} user
     */
    store(user: User): Promise<User>;
}