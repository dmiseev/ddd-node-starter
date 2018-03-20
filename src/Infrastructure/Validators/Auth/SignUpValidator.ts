import * as joi from 'joi';

module.exports = {
    body: {
        email: joi.string().max(255).email().required(),
        password: joi.string().min(6).max(30).regex(/[a-zA-Z0-9]{6,30}/).required(),
        firstName: joi.string().max(255).required(),
        lastName: joi.string().max(255).required(),
    }
};