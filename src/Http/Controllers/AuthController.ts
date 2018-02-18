import { Request, Response } from 'express';
import { Controller, Get, Post } from '../../framework/decorators';
import { injectable, inject } from 'inversify';
import { AuthService } from '../../Services/AuthService';

@Controller('/auth')
@injectable()
export class AuthController {

    constructor(@inject('AuthService') private userService: AuthService) {}

    /**
     * @param {Request} request
     * @returns {Promise<void>}
     */
    @Post('/sign-in')
    public async signIn(request: Request) {
        // TODO: read this - https://github.com/inversify/InversifyJS/issues/487
    }

    /**
     * @param {Request} request
     * @returns {Promise<void>}
     */
    @Post('/sign-up')
    public async signUp(request: Request) {

    }

    /**
     * @param {Request} request
     * @returns {Promise<void>}
     */
    @Get('/token')
    public async refresh(request: Request) {

    }
}