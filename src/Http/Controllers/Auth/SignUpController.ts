import { Request } from 'express';
import { controller, httpPost } from 'inversify-express-utils';
import { inject } from 'inversify';
import { SignUpDTO } from "../../../Infrastructure/DTO/Auth/SignUpDTO";
import { IAuthService } from '../../../Domain/Core/IAuthService';
import * as validate from 'express-validation';
import * as signUpValidator from '../../../Infrastructure/Validators/Auth/SignUpValidator';

@controller('/auth/sign-up')
export class SignUpController {

    constructor(@inject('IAuthService') private authService: IAuthService) {}

    /**
     * @param {Request} request
     * @returns {Promise<void>}
     */
    @httpPost('/', validate(signUpValidator))
    public async signUp(request: Request) {

        return this.authService.signUp(
            SignUpDTO.fromRequest(request)
        );
    }
}