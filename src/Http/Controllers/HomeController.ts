import { loggerMiddleware } from "../Middleware/CustomMiddleware";
import { controller, httpGet } from 'inversify-express-utils';

@controller('/', loggerMiddleware)
export class HomeController {

    @httpGet('/')
    private home() {
        return {message: 'Home page.'};
    }
}