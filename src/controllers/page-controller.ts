import * as express from 'express';
import { Controller, Get } from '../framework/decorators';
import { injectable } from 'inversify';

@Controller('/')
@injectable()
export class PageController {
    
    @Get('/')
    private index(req: express.Request, res: express.Response): string {

        return res.json({
            message: 'Home page.'
        })
    }

    @Get('/about')
    private about(req: express.Request, res: express.Response): string {

        return res.json({
            message: 'About page.'
        })
    }

    @Get('/faq')
    private faq(req: express.Request, res: express.Response): string {

        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        return res.json({
            message: 'FAQ page.',
            ip: ip
        })
    }
}