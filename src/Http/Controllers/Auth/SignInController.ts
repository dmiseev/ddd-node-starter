import { Request } from 'express';
import { controller, httpPost } from 'inversify-express-utils';
import { inject } from 'inversify';
import { SignInDTO } from "../../../Infrastructure/DTO/Auth/SignInDTO";
import { loggerMiddleware } from '../../Middleware/CustomMiddleware';
import { IAuthService } from '../../../Domain/Core/IAuthService';

@controller('/auth/sign-in', loggerMiddleware)
export class SignInController {

    constructor(@inject('IAuthService') private authService: IAuthService) {}

    /**
     * @param {Request} request
     * @returns {Promise<void>}
     */
    @httpPost('/')
    public async signIn(request: Request) {

        return this.authService.signIn(
            SignInDTO.fromRequest(request)
        );
    }
}