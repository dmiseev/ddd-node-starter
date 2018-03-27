import { IRequest } from '../../../Utils/Request/custom';

export class FriendRequestDTO {

    private _userId: number;

    constructor(userId: number) {
        this._userId = userId;
    }

    /**
     * @param {Request} request
     * @returns {FriendRequestDTO}
     */
    static fromRequest(request: IRequest) {

        return new FriendRequestDTO(
            request.body.userId
        );
    }

    get userId(): number {
        return this._userId;
    }
}