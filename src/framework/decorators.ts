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
    return Method('all', path, ...middleware);
}

export function Get(path: string | RegExp, ...middleware: Function[]) {
    return Method('get', path, ...middleware);
}

export function Post(path: string | RegExp, ...middleware: Function[]) {
    return Method('post', path, ...middleware);
}

export function Put(path: string | RegExp, ...middleware: Function[]) {
    return Method('put', path, ...middleware);
}

export function Patch(path: string | RegExp, ...middleware: Function[]) {
    return Method('patch', path, ...middleware);
}

export function Head(path: string | RegExp, ...middleware: Function[]) {
    return Method('head', path, ...middleware);
}

export function Delete(path: string | RegExp, ...middleware: Function[]) {
    return Method('delete', path, ...middleware);
}

export function Method(method: string, path: string | RegExp, ...middleware: Function[]) {

    return function (target: any, key: string, value: any) {
        getContainer().registerHandler(method, path, target, middleware, (req: express.Request, res: express.Response, next: any) => {
            let result = getKernel().get(target.constructor.name)[key](req, res, next);

            if (result || !res.headersSent) {

                if (result instanceof Promise) {

                    result.then((result: any) => {
                        res.send(serialize(result));
                        // res.json(serialize(result));
                    }).catch((err) => {
                        // TODO: return REST error message
                        res.send(err);
                    });

                } else {
                    res.send(result);
                }
            }
        });
    };
}