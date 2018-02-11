import * as express from 'express';
import { Controller, Get, Post } from '../framework/decorators';
import { injectable, inject } from 'inversify';
import { UserService } from "../services/user-service";

@Controller('/users')
@injectable()
export class UserController {

    constructor( @inject('UserService') private userService: UserService ) {}

    /**
     * @param {express.Request} req
     * @param {express.Response} res
     */
    @Get('/')
    private all(req: express.Request, res: express.Response) {
        res.status(200).json(this.userService.all())
    }

    /**
     * @param {express.Request} req
     * @param {express.Response} res
     */
    @Get('/:id')
    private get(req: express.Request, res: express.Response) {
        res.status(200).json(
            this.userService.get(parseInt(req.params.id))
        );
    }

    /**
     * @param {express.Request} req
     * @param {express.Response} res
     */
    @Post('/')
    private store(req: express.Request, res: express.Response) {
        res.status(201).json(
            this.userService.store(req.body.firstName, req.body.lastName)
        );
    }
}