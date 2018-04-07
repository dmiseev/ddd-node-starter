import 'reflect-metadata';
import { createConnection } from 'typeorm';
import container from './config/inversify.config';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as express from 'express';
import * as validate from 'express-validation';
import * as path from "path";
import { jsonMiddleware, loggerMiddleware } from './Http/Middleware/CustomMiddleware';
import { AccessDeniedError } from './Domain/Core/AccessDeniedError';
import { createConnectionOptions } from './config/database';

createConnection(createConnectionOptions()).then(async connection => {

    console.log(123);
    const port: number = parseInt(process.env.PORT);

    let server = new InversifyExpressServer(container, null, {rootPath: '/api/v1'});

    server.setConfig((app) => {
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
        app.use('/uploads', express.static(path.resolve('./public/uploads')));
        app.use(jsonMiddleware, loggerMiddleware);
        app.use(helmet());
    });

    server.setErrorConfig((app) => {

        app.use((err, req, res, next) => {

            if (err instanceof validate.ValidationError) {
                err.status = 422;
                res.status(err.status).json(Object.assign({errorMessage: 'Validation error.'}, {error: err}));
                return;
            }

            if (err instanceof AccessDeniedError) {
                res.status(403).send({errorMessage: err.message});
                return;
            }

            if (err instanceof Error) {
                console.error(err.stack);
                res.status(400).send({errorMessage: err.message});
                return;
            }

            res.status(500).send(err.stack);

            // TODO: uncomment when production
            // res.status(500).send('Something broke!');
        });
    });

    server.build().listen(port, 'localhost', function () {
        console.log('listening on http://localhost:' + port);
    });

}).catch(error => console.log('TypeORM connection error: ', error));

process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error.message);
});
