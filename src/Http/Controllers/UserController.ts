import { Request } from 'express';
import { controller, httpGet } from 'inversify-express-utils';
import { inject } from 'inversify';
import { User } from '../../Domain/User/User';
import { authMiddleware, loggerMiddleware } from '../Middleware/CustomMiddleware';
import { IUserService } from '../../Domain/User/IUserService';

@controller('/users', loggerMiddleware, authMiddleware)
export class UserController {

    constructor(@inject('IUserService') private userService: IUserService) {}

    /**
     * @returns {Promise<User[]>}
     */
    @httpGet('/')
    public async all(): Promise<User[]> {
        return await this.userService.all();
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