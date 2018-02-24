import { Request, Response, RequestHandler } from 'express';
import { Controller, Get, Post } from '../../framework/decorators';
import { injectable, inject } from 'inversify';
import { UserService } from '../../Services/UserService';
import { User } from '../../Domain/User/User';
import { authMiddleware, loggerMiddleware } from "../../framework/middlewares";

@Controller('/users', loggerMiddleware)
@injectable()
export class UserController {

    constructor(@inject('UserService') private userService: UserService) {}

    /**
     * @returns {Promise<User[]>}
     */
    @Get('/', authMiddleware)
    public async all(): Promise<User[]> {
        return await this.userService.all();
    }

    /**
     * @param {Request} request
     * @returns {Promise<User>}
     */
    @Get('/:id', authMiddleware)
    public async byId(request: Request): Promise<User> {
        return await this.userService.byId(parseInt(request.params.id));
    }
}