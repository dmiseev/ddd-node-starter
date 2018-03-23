import * as joi from 'joi';

module.exports = {
    body: {
        email: joi.string().max(255).email().required(),
        firstName: joi.string().max(255).required(),
        lastName: joi.string().max(255).required(),
    }
};