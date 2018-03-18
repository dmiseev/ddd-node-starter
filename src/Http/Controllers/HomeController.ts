import { controller, httpGet } from 'inversify-express-utils';

@controller('/')
export class HomeController {

    @httpGet('/')
    private home() {
        return {message: 'Home page.'};
    }
}