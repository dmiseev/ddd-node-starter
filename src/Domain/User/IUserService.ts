import { User } from './User';
import { Pagination } from '../Core/Pagination';

export interface IUserService {

    /**
     * @param {Pagination} pagination
     * @returns {Promise<User[]>}
     */
    all(pagination: Pagination): Promise<[User[], number]>;

    /**
     * @param {number} id
     * @returns {Promise<User>}
     */
    byId(id: number): Promise<User>;

    /**
     * @param {number} id
     * @returns {Promise<void>}
     */
    remove(id: number): Promise<void>;
}