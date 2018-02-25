import { Request, Response } from 'express';
import { Controller, Get, Post } from '../../framework/decorators';
import { injectable, inject } from 'inversify';
import { AuthService } from '../../Services/AuthService';
import { SignInDTO } from "../../Infrastructure/DTO/Auth/SignInDTO";
import { SignUpDTO } from "../../Infrastructure/DTO/Auth/SignUpDTO";
import { authMiddleware } from "../Middleware/CustomMiddleware";

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

        return this.userService.signIn(
            SignInDTO.fromRequest(request)
        );
    }

    /**
     * @param {Request} request
     * @returns {Promise<void>}
     */
    @Post('/sign-up')
    public async signUp(request: Request) {

        return this.userService.signUp(
            SignUpDTO.fromRequest(request)
        );
    }

    /**
     * @param {Request} request
     * @returns {Promise<void>}
     */
    @Get('/token', authMiddleware)
    public async refresh(request: Request) {

    }
}