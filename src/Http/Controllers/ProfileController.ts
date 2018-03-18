import { controller, httpGet } from 'inversify-express-utils';
import { User } from '../../Domain/User/User';
import { authMiddleware } from '../Middleware/CustomMiddleware';
import { IRequest } from '../../Utils/Request/custom';

@controller('/users/me', authMiddleware)
export class ProfileController {

    /**
     * @param {IRequest} request
     * @returns {User}
     */
    @httpGet('/')
    public me(request: IRequest): User {

        return request.user;
    }
}