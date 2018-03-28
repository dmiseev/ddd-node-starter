import { Request, Response } from 'express';
import { controller, httpPost } from 'inversify-express-utils';
import { inject } from 'inversify';
import { SignUpDTO } from "../../../Infrastructure/DTO/Auth/SignUpDTO";
import { IAuthService } from '../../../Domain/Core/IAuthService';
import * as validate from 'express-validation';
import * as signUpValidator from '../../../Infrastructure/Validators/Auth/SignUpValidator';
import { User } from '../../../Domain/User/User';
import { serialize } from 'class-transformer';

@controller('/auth/sign-up')
export class SignUpController {

    constructor(@inject('IAuthService') private authService: IAuthService) {}

    /**
     * @param {Request} request
     * @param {Response} response
     *
     * @returns {Promise<string>}
     */
    @httpPost('/', validate(signUpValidator))
    public async signUp(request: Request, response: Response) {

        return await this.authService.signUp(SignUpDTO.fromRequest(request))
            .then((user: User) => {
                response.status(201);
                return serialize(user);
            });
    }
}