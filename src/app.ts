import 'reflect-metadata';
import { createConnection } from 'typeorm';
import container from './config/inversify.config';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';

createConnection().then(async connection => {

    const port: number = 3000;

    let server = new InversifyExpressServer(container);

    server.setConfig((app) => {
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
        app.use(helmet());
    });

    server.setErrorConfig((app) => {

        app.use((err, req, res, next) => {

            console.error(err.stack);

            if (err instanceof Error) {
                res.status(400).send({errorMessage: err.message}); return;
            } else {
                res.status(500).send(err.stack);
            }

            // res.status(500).send('Something broke!');
        });
    });

    server.build().listen(port, 'localhost', function () {
        console.log('listening on http://localhost:' + port);
    });

}).catch(error => console.log('TypeORM connection error: ', error));

