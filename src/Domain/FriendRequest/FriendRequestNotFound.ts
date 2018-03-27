import { UserNotFound } from '../User/UserNotFound';
import { AccessDeniedError } from '../Core/AccessDeniedError';

export class FriendRequestNotFound extends Error{

    /**
     * @param {number} id
     * @returns {FriendRequestNotFound}
     */
    static fromId(id: number): FriendRequestNotFound
    {
        return new FriendRequestNotFound('Friend request with ID #' + id + ' not found.')
    }

    /**
     * @returns {UserNotFound}
     */
    static forbidden(): AccessDeniedError
    {
        return new AccessDeniedError('Accept friend request can only recipient.')
    }

    /**
     * @returns {UserNotFound}
     */
    static friendExist(): FriendRequestNotFound
    {
        return new FriendRequestNotFound('You already have this user in your friend list.')
    }

    /**
     * @returns {UserNotFound}
     */
    static waitingAcceptFromReceiver(): FriendRequestNotFound
    {
        return new FriendRequestNotFound('This friend request is waiting for accept.')
    }
}