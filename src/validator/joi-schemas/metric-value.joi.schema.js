const Joi = require('joi');
module.exports = Joi.object().keys({
    value: Joi.number().required()
});