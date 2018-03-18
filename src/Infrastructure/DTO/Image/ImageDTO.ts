import { Request } from 'express';

export class ImageDTO {

    private _name: string;
    private _path: string;

    constructor(name: string, path: string)
    {
        this._name = name;
        this._path = path;
    }

    /**
     * @param {Request} request
     * @returns {SignUpDTO}
     */
    static fromRequest(request: Request)
    {
        return new ImageDTO(request.body.name, request.body.path);
    }

    get name(): string {
        return this._name;
    }

    get path(): string {
        return this._path;
    }
}