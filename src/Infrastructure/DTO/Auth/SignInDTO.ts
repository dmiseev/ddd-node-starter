import { Request } from 'express';

export class SignInDTO{

    private _email: string;
    private _password: string;

    constructor(email: string, password: string)
    {
        this._email = email;
        this._password = password;
    }

    /**
     * @param {Request} request
     * @returns {SignInDTO}
     */
    static fromRequest(request: Request)
    {
        return new SignInDTO(
            request.body.email,
            request.body.password
        );
    }

    get email(): string {
        return this._email;
    }

    get password(): string {
        return this._password;
    }
}