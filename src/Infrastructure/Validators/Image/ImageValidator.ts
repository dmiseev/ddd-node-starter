import * as joi from 'joi';

module.exports = {
    body: {
        name: joi.string().required(),
        path: joi.string().regex(/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif)$)/).required()
    }
};