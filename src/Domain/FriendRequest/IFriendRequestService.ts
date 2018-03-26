import { FriendRequest } from './FriendRequest';
import { Pagination } from '../Core/Pagination';
import { FriendRequestDTO } from '../../Infrastructure/DTO/FriendRequest/FriendRequestDTO';
import { User } from '../User/User';

export interface IFriendRequestService {

    /**
     * @param {number} userId
     * @param {Pagination} pagination
     *
     * @returns {Promise<FriendRequest[]>}
     */
    bySenderId(userId: number, pagination: Pagination): Promise<[FriendRequest[], number]>;

    /**
     * @param {number} userId
     * @param {Pagination} pagination
     *
     * @returns {Promise<FriendRequest[]>}
     */
    byReceiverId(userId: number, pagination: Pagination): Promise<[FriendRequest[], number]>;

    /**
     * @param {number} id
     * @returns {Promise<FriendRequest>}
     */
    byId(id: number): Promise<FriendRequest>;

    /**
     * @param {User} sender
     * @param {FriendRequestDTO} DTO
     *
     * @returns {Promise<FriendRequest>}
     */
    store(sender: User, DTO: FriendRequestDTO): Promise<FriendRequest>;

    /**
     * @param {number} id
     * @returns {Promise<void>}
     */
    remove(id: number): Promise<void>;
}