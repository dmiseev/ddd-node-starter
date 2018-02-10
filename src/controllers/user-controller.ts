import * as express from 'express';
import { Controller, Get } from '../framework/decorators';
import { injectable, inject } from 'inversify';
import { UserService } from "../services/user-service";

@Controller('/users')
@injectable()
export class UserController {

    constructor( @inject('UserService') private userService: UserService ) {}
    
    @Get('/')
    private all(req: express.Request, res: express.Response): Promise<any> {

        return res.status(200).json(this.userService.all())
    }

    @Get('/:id')
    private get(req: express.Request, res: express.Response) {

        res.status(200).json(
            this.userService.get(parseInt(req.params.id))
        );
    }
}