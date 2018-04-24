import { controller, httpGet, httpPut } from 'inversify-express-utils';
import { User } from '../../Domain/User/User';
import { authMiddleware } from '../Middleware/CustomMiddleware';
import { IRequest } from '../../Utils/Request/custom';
import { inject } from 'inversify';
import { IUserService } from '../../Domain/User/IUserService';
import { ProfileDTO } from '../../Infrastructure/DTO/Profile/ProfileDTO';
import { Response } from 'express';
import { serialize } from 'class-transformer';
import * as validate from 'express-validation';
import * as profileValidator from '../../Infrastructure/Validators/Profile/ProfileValidator';

@controller('/users/me', authMiddleware)
export class ProfileController {

    constructor(@inject('IUserService') private userService: IUserService) {
    }

    /**
     * @param {IRequest} request
     */
    @httpGet('/')
    public me(request: IRequest) {

        return serialize(request.user, { groups: ['detail'] });
    }

    /**
     * @param {IRequest} request
     * @param {Response} response
     */
    @httpPut('/', validate(profileValidator))
    public async update(request: IRequest, response: Response) {

        return await this.userService.update(request.user.id, ProfileDTO.fromRequest(request))
            .then((user: User) => {
                response.status(202);
                return serialize(user);
            });
    }
}