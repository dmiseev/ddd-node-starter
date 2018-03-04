import { Request } from 'express';
import { controller, httpPost } from 'inversify-express-utils';
import { inject } from 'inversify';
import { AuthService } from '../../../Services/AuthService';
import { SignUpDTO } from "../../../Infrastructure/DTO/Auth/SignUpDTO";
import { loggerMiddleware } from '../../Middleware/CustomMiddleware';

@controller('/auth/sign-up', loggerMiddleware)
export class SignUpController {

    constructor(@inject('AuthService') private userService: AuthService) {}

    /**
     * @param {Request} request
     * @returns {Promise<void>}
     */
    @httpPost('/')
    public async signUp(request: Request) {

        return this.userService.signUp(
            SignUpDTO.fromRequest(request)
        );
    }
}