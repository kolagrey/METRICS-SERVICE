const { messageConstants } = require('../constants');

// Data validator middleware module for validating req.body payload
const validator = (schema, property) => {
    return (req, res, next) => {
        const { ...payload } = req[property];
        const { error } = schema.validate(payload);
        const isValid = error === null;
        if (isValid) {
            next();
        } else {
            const { details } = error;
            res.status(400).json({ success: false, reason: details[0], message: messageConstants.MISSING_FIELDS });
        }
    };
};

// Data validator middleware module for validating req.params data
const paramsValidator = (schema, property) => {
    return (req, res, next) => {
        const { ...params } = req[property];
        const { error } = schema.validate(params);
        const isValid = error === null;
        if (isValid) {
            next();
        } else {
            const { details } = error;
            res.status(400).json({ success: false, reason: details[0], message: messageConstants.MISSING_URL_ID });
        }
    };
};

module.exports = {
    validator,
    paramsValidator
};
