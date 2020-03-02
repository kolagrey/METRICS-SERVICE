const { eventLogger, errorLogger } = require('./event.logger');
const { present } = require('./present');
module.exports = {
    present,
    eventLogger,
    errorLogger
};