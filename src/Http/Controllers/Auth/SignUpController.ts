import { Request } from 'express';
import { controller, httpPost } from 'inversify-express-utils';
import { inject } from 'inversify';
import { SignUpDTO } from "../../../Infrastructure/DTO/Auth/SignUpDTO";
import { loggerMiddleware } from '../../Middleware/CustomMiddleware';
import { IAuthService } from '../../../Domain/Core/IAuthService';

@controller('/auth/sign-up', loggerMiddleware)
export class SignUpController {

    constructor(@inject('IAuthService') private authService: IAuthService) {}

    /**
     * @param {Request} request
     * @returns {Promise<void>}
     */
    @httpPost('/')
    public async signUp(request: Request) {

        return this.authService.signUp(
            SignUpDTO.fromRequest(request)
        );
    }
}