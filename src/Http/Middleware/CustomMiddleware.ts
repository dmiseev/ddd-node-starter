import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { getManager } from "typeorm";
import { User } from "../../Domain/User/User";

/**
 * Show REST info in logs
 */
export function loggerMiddleware(req: express.Request, res: any, next: any) {

    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log('[' + req.method + ']: ' + fullUrl);

    next();
}

export function authMiddleware(req: express.Request, res: any, next: any) {

    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).send({errorMessage: 'not authorized'}); return;
    }

    let userJson = jwt.decode(token);

    if (!userJson || !userJson.id) {
        res.status(401).send({errorMessage: 'not authorized'}); return;
    }

    let entityManager = getManager();

    entityManager.createQueryBuilder(User, 'u')
        .where('u.id = :id')
        .setParameter('id', userJson.id)
        .getOne()
        .then((user: User) => {
            // console.log(user);
            next();
        })
        .catch((err) => {
            console.log(err);
            res.status(401).send({errorMessage: 'not authorized'}); return;
        });
}