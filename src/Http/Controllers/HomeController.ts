import { controller, httpGet } from 'inversify-express-utils';

@controller('/')
export class HomeController {

    @httpGet('/')
    public home() {

        return {message: 'Home page.'};
    }
}