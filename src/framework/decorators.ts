import { getKernel } from './kernel';
import { getContainer } from './route-container';
import * as express from 'express';
import { serialize } from 'class-transformer';

export function Controller(path: string | RegExp, ...middleware: Function[]) {

    return function (target: any) {
        getContainer().registerController(path, middleware, target);
    };
}

export function All(path: string | RegExp, ...middleware: Function[]) {
    return Method('all', path, 200, ...middleware);
}

export function Get(path: string | RegExp, ...middleware: Function[]) {
    return Method('get', path, 200, ...middleware);
}

export function Post(path: string | RegExp, ...middleware: Function[]) {
    return Method('post', path, 201, ...middleware);
}

export function Put(path: string | RegExp, ...middleware: Function[]) {
    return Method('put', path, 202, ...middleware);
}

export function Patch(path: string | RegExp, ...middleware: Function[]) {
    return Method('patch', path, 200, ...middleware);
}

export function Head(path: string | RegExp, ...middleware: Function[]) {
    return Method('head', path, 200, ...middleware);
}

export function Delete(path: string | RegExp, ...middleware: Function[]) {
    return Method('delete', path, 204, ...middleware);
}

export function Method(method: string, path: string | RegExp, statusCode: number = 200, ...middleware: Function[]) {

    return function (target: any, key: string, value: any) {
        getContainer().registerHandler(method, path, target, middleware, (req: express.Request, res: express.Response, next: any) => {
            let result = getKernel().get(target.constructor.name)[key](req, res, next);

            if (!result || res.headersSent) {
                return;
            }

            res.setHeader('Content-Type', 'application/json');

            if (result instanceof Promise) {

                result.then((result: any) => {
                    res.status(statusCode).send(serialize(result)); return;
                }).catch((err) => {

                    console.log(err);

                    if (err instanceof Error) {
                        res.status(400).send({errorMessage: err.message}); return;
                    } else {
                        res.status(500).send(err); return;
                    }
                });
            } else {

                if (result instanceof Error) {
                    res.status(400).send({errorMessage: result.message}); return;
                } else {
                    res.status(500).send(result); return;
                }
            }
        });
    };
}