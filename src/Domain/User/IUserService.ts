import { User } from './User';

export interface IUserService {

    /**
     * @returns {Promise<User[]>}
     */
    all(): Promise<User[]>;

    /**
     * @param {number} id
     * @returns {Promise<User>}
     */
    byId(id: number): Promise<User>;
}