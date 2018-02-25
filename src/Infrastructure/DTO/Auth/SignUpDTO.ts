import { Request } from 'express';

export class SignUpDTO{

    private _email: string;
    private _password: string;
    private _firstName: string;
    private _lastName: string;

    constructor(email: string, password: string, firstName: string, lastName: string)
    {
        this._email = email;
        this._password = password;
        this._firstName = firstName;
        this._lastName = lastName;
    }

    /**
     * @param {} request
     * @returns {SignUpDTO}
     */
    static fromRequest(request: Request)
    {
        return new SignUpDTO(
            request.body.email,
            request.body.password,
            request.body.firstName,
            request.body.lastName
        );
    }

    get email(): string {
        return this._email;
    }

    get password(): string {
        return this._password;
    }

    get firstName(): string {
        return this._firstName;
    }

    get lastName(): string {
        return this._lastName;
    }
}