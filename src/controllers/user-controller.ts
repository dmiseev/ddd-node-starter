import * as express from 'express';
import { Controller, Get } from '../framework/decorators';
import { injectable, inject } from 'inversify';
import { UserService } from "../services/user-service";

@Controller('/users')
@injectable()
export class UserController {

    constructor( @inject('UserService') private userService: UserService ) {}
    
    @Get('/')
    private all(req: express.Request, res: express.Response): string {

        return res.json(this.userService.all())
    }

    @Get('/:id')
    private get(req: express.Request, res: express.Response): string {

        return res.json(this.userService.get(req.params.id))
    }
}