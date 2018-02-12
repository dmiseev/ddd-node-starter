import { Request, Response } from 'express';
import { Controller, Get, Post } from '../framework/decorators';
import { injectable, inject } from 'inversify';
import { UserService } from '../services/UserService';
import { User } from '../entities/User';

@Controller('/users')
@injectable()
export class UserController {

    constructor(@inject('UserService') private userService: UserService) {}

    /**
     * @returns {Promise<User[]>}
     */
    @Get('/')
    public async all(): Promise<User[]> {
        return await this.userService.all();
    }

    /**
     * @param {Request} request
     * @returns {Promise<User>}
     */
    @Get('/:id')
    public async byId(request: Request): Promise<User> {
        return await this.userService.byId(parseInt(request.params.id));
    }

    /**
     * @param {Request} request
     * @returns {Promise<User>}
     */
    @Post('/')
    public async store(request: Request): Promise<User> {
        return await this.userService.store(request.body.firstName, request.body.lastName);
    }
}