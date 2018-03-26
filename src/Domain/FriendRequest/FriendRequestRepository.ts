import { FriendRequest } from './FriendRequest';
import { Pagination } from '../Core/Pagination';

export interface FriendRequestRepository {

    /**
     * @param {number} senderId
     * @param {Pagination} pagination
     *
     * @returns {Promise<[FriendRequest[] , number]>}
     */
    bySenderId(senderId: number, pagination: Pagination): Promise<[FriendRequest[], number]>;

    /**
     * @param {number} receiverId
     * @param {Pagination} pagination
     *
     * @returns {Promise<[FriendRequest[] , number]>}
     */
    byReceiverId(receiverId: number, pagination: Pagination): Promise<[FriendRequest[], number]>;

    /**
     * @param {number} id
     * @returns {Promise<FriendRequest>}
     */
    byId(id: number): Promise<FriendRequest>;

    /**
     * @param {FriendRequest} user
     */
    store(user: FriendRequest): Promise<FriendRequest>;
}