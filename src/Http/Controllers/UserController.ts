import { Request } from 'express';
import { controller, httpGet } from 'inversify-express-utils';
import { inject } from 'inversify';
import { User } from '../../Domain/User/User';
import { authMiddleware } from '../Middleware/CustomMiddleware';
import { IUserService } from '../../Domain/User/IUserService';
import { IRequest } from '../../Utils/Request/custom';
import { Pagination } from '../../Domain/Core/Pagination';

@controller('/users', authMiddleware)
export class UserController {

    constructor(@inject('IUserService') private userService: IUserService) {
    }

    /**
     * @param {IRequest} request
     * @returns {Promise<[User[], number]>}
     */
    @httpGet('/')
    public async all(request: IRequest): Promise<[User[], number]> {

        // TODO: exclude password field from user entity

        return await this.userService.all(
            Pagination.fromRequest(request)
        );
    }

    /**
     * @param {Request} request
     * @returns {Promise<User>}
     */
    @httpGet('/:id')
    public async byId(request: Request): Promise<User> {
        return await this.userService.byId(parseInt(request.params.id));
    }
}