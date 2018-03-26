
export class FriendRequestNotFound extends Error{

    /**
     * @param {number} id
     * @returns {FriendRequestNotFound}
     */
    static fromId(id: number): FriendRequestNotFound
    {
        return new FriendRequestNotFound('Friend request with ID #' + id + ' not found.')
    }
}