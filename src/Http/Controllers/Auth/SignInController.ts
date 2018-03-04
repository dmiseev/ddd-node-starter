import { Request } from 'express';
import { controller, httpPost } from 'inversify-express-utils';
import { inject } from 'inversify';
import { AuthService } from '../../../Services/AuthService';
import { SignInDTO } from "../../../Infrastructure/DTO/Auth/SignInDTO";
import { loggerMiddleware } from '../../Middleware/CustomMiddleware';

@controller('/auth/sign-in', loggerMiddleware)
export class SignInController {

    constructor(@inject('AuthService') private userService: AuthService) {}

    /**
     * @param {Request} request
     * @returns {Promise<void>}
     */
    @httpPost('/')
    public async signIn(request: Request) {

        return this.userService.signIn(
            SignInDTO.fromRequest(request)
        );
    }
}