import * as joi from 'joi';

module.exports = {
    body: {
        receiverId: joi.number().integer().required(),
    }
};