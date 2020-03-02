// Module for logging service events to DB for insight

const EventLogStore = require('nedb');
const eventLog = new EventLogStore({ filename: '../STORES/events.json', autoload: true });
const errorLog = new EventLogStore({ filename: '../STORES/errors.json', autoload: true });

const eventLogger = () => ({
    createEvent: ({ type, description, payload, meta = {} }) => {
        return eventLog.insert({
            type, description, payload, created: new Date()
        }, (err, newEventLog) => {
            return ({ error: err, data: newEventLog });
        });
    },

    getEvents: ({ condition }) => {
        return new Promise((resolve, reject) => {
            eventLog.find(condition, (err, eventLog) => {
                if (err)
                    reject(err);
                resolve({ error: err, data: eventLog });
            });
        });
    }
});

const errorLogger = {
    createError: ({ type, description, payload, meta = {} }) => {
        return errorLog.insert({
            type, description, payload, created: new Date()
        }, (err, newErrorLog) => {
            return ({ error: err, data: newErrorLog });
        });
    },

    getErrors: ({ condition }) => {
        return new Promise((resolve, reject) => {
            errorLog.find(condition, (err, errorLog) => {
                if (err)
                    reject(err);
                resolve({ error: err, data: errorLog });
            });
        });
    }
};

module.exports = {
    eventLogger,
    errorLogger
};