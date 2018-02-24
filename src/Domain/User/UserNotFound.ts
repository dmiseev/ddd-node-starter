
export class UserNotFound extends Error{

    /**
     * @returns {UserNotFound}
     */
    static authorized(): UserNotFound
    {
        return new UserNotFound('The email or password is incorrect. Try again, please.')
    }

    /**
     * @param {number} id
     * @returns {UserNotFound}
     */
    static fromId(id: number): UserNotFound
    {
        return new UserNotFound('User with ID #' + id + ' not found.')
    }
}