import {Request} from 'express';
import {Controller, Get} from '../framework/decorators';
import {injectable} from 'inversify';

@Controller('/')
@injectable()
export class PageController {

    @Get('/')
    private index() {

        return {message: 'Home page.'};
    }

    @Get('/about')
    private about() {

        return {message: 'About page.'};
    }

    /**
     * @param {Request} request
     */
    @Get('/faq')
    private faq(request: Request) {

        return {
            message: 'FAQ page.',
            ip: request.headers['x-forwarded-for'] || request.connection.remoteAddress
        };
    }
}