import { IRequest } from '../../../Utils/Request/custom';

export class ProfileDTO {

    private _email: string;
    private _firstName: string;
    private _lastName: string;

    constructor(email: string, firstName: string, lastName: string) {
        this._email = email;
        this._firstName = firstName;
        this._lastName = lastName;
    }

    /**
     * @param {Request} request
     * @returns {ProfileDTO}
     */
    static fromRequest(request: IRequest) {
        return new ProfileDTO(
            request.body.email,
            request.body.firstName,
            request.body.lastName
        );
    }

    get email(): string {
        return this._email;
    }

    get firstName(): string {
        return this._firstName;
    }

    get lastName(): string {
        return this._lastName;
    }
}