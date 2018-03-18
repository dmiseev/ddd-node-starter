import 'reflect-metadata';
import { createConnection } from 'typeorm';
import container from './config/inversify.config';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as express from 'express';
import * as validate from 'express-validation';
import * as path from "path";
import { loggerMiddleware } from './Http/Middleware/CustomMiddleware';

createConnection().then(async connection => {

    const port: number = 3000;

    let server = new InversifyExpressServer(container, null, {rootPath: '/api/v1'});

    server.setConfig((app) => {
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
        app.use('/uploads', express.static(path.resolve('./public/uploads')));
        app.use(helmet());
        app.use(loggerMiddleware);
    });

    server.setErrorConfig((app) => {

        app.use((err, req, res, next) => {

            if (err instanceof validate.ValidationError) {
                res.status(err.status).json(Object.assign({errorMessage: 'Validation error.'}, {error: err}));
                return;
            }

            if (err instanceof Error) {
                console.error(err.stack);
                res.status(400).send({errorMessage: err.message});
                return;
            }

            res.status(500).send(err.stack);

            // res.status(500).send('Something broke!');
        });
    });

    server.build().listen(port, 'localhost', function () {
        console.log('listening on http://localhost:' + port);
    });

}).catch(error => console.log('TypeORM connection error: ', error));

