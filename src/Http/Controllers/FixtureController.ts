import { controller, httpDelete, httpPost } from 'inversify-express-utils';
import { Response } from 'express';
import { inject } from 'inversify';
import { IFixtureService } from '../../Domain/Core/IFixtureService';
import { IRequest } from '../../Utils/Request/custom';

@controller('/fixtures')
export class FixtureController {

    constructor(@inject('IFixtureService') private fixtureService: IFixtureService) {
    }

    @httpPost('/')
    public setUp(request: IRequest, response: Response) {

        response.status(201);
        this.fixtureService.setUp();

        return {message: 'Fixtures loaded.'}
    }

    @httpDelete('/')
    public remove(request: IRequest, response: Response) {

        response.status(204);
        this.fixtureService.clear();
    }
}