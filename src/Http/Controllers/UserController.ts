import { Response } from 'express';
import { controller, httpDelete, httpGet } from 'inversify-express-utils';
import { inject } from 'inversify';
import { User } from '../../Domain/User/User';
import { authMiddleware } from '../Middleware/CustomMiddleware';
import { IUserService } from '../../Domain/User/IUserService';
import { IRequest } from '../../Utils/Request/custom';
import { Pagination } from '../../Domain/Core/Pagination';
import { serialize } from 'class-transformer';

@controller('/users', authMiddleware)
export class UserController {

    constructor(@inject('IUserService') private userService: IUserService) {
    }

    /**
     * @param {IRequest} request
     * @param {Response} response
     *
     * @returns {User[]}
     */
    @httpGet('/')
    public all(request: IRequest, response: Response) {

        return this.userService.all(Pagination.fromRequest(request))
            .then((data: [User[], number]) => {
                response.set('X-Items-Count', data[1].toString());
                return serialize(data[0]);
            });
    }

    /**
     * @param {Request} request
     * @returns {Promise<User>}
     */
    @httpGet('/:id')
    public byId(request: IRequest,) {

        return this.userService.byId(parseInt(request.params.id))
            .then((user: User) => {
                return serialize(user);
            });
    }

    /**
     * @param {Request} request
     * @param {Response} response
     */
    @httpDelete('/:id')
    public remove(request: IRequest, response: Response) {

        return this.userService.remove(parseInt(request.params.id))
            .then(() => {
                response.set('X-Items-Count', '0');
                response.status(204);
            });
    }
}