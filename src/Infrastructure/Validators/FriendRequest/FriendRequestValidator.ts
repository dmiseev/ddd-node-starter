import * as joi from 'joi';

module.exports = {
    body: {
        userId: joi.number().integer().required(),
    }
};