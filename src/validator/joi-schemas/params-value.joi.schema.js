const Joi = require('joi');
module.exports = Joi.object().keys({
    key: Joi.string().required()
});