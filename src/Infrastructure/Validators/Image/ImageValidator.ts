import * as joi from 'joi';

module.exports = {
    body: {
        name: joi.string().max(255).required(),
        path: joi.string().max(255).regex(/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif)$)/).required()
    }
};