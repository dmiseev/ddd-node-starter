import { IRequest } from '../../../Utils/Request/custom';

export class FriendRequestDTO {

    private _receiverId: number;

    constructor(receiverId: number) {
        this._receiverId = receiverId;
    }

    /**
     * @param {Request} request
     * @returns {FriendRequestDTO}
     */
    static fromRequest(request: IRequest) {

        return new FriendRequestDTO(
            request.body.receiverId
        );
    }

    get receiverId(): number {
        return this._receiverId;
    }
}