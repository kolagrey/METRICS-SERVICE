const { successResponse, catchResponse } = require('../service-response');
const { messageConstants, eventType } = require('../../constants');
const { eventLogger, errorLogger, present } = require('../../utils');
const { collection } = require('../../db');

module.exports = {
    create: async (req, res, next) => {
        const { key } = req.params; // Extract key from request params
        const { value } = req.body; // EXtract value from request body
        try {
            await collection().create({ key, value }); // Save to DB Collection
            // <Log Create Event>
            eventLogger().createEvent({
                type: eventType.CREATE_NEW,
                description: `New log entry for ${key} at ${new Date()}`,
                payload: {
                    key,
                    value
                }
            });
            // </Log Create Event>

            // Respond to Client
            res.message = messageConstants.CREATED;
            successResponse(req, res);

        } catch (error) {
            // <Log Error Event>
            errorLogger().createError({
                type: eventType.CREATE_ERROR,
                description: `Error occured while servicing new log entry for ${key} at ${new Date()}`,
                payload: {
                    key,
                    value
                },
                meta: {
                    error
                }
            });
            // </Log Error Event>

            res.message = messageConstants.CATCH_MESSAGE;
            catchResponse(error, req, res, next);
        }
    },
    get: async (req, res, next) => {
        const { key } = req.params; // Get key from url params
        
        // <Log Request Event>
        eventLogger().createEvent({
            type: eventType.REQUEST,
            description: `New service request for ${key} at ${new Date()}`,
            payload: {
                key
            }
        });
        // </Log Request Event>

        // Get Data from Collection
        try {
            const { minute, hour, day, month, year } = present(); // Get the current time veriables
            const lastHour = hour - 1; // Get last hour value

            // Get entries from DB Collection
            const { data } = await collection().find({
                key,
                day,
                month,
                year,
                hour: {
                    $gte: lastHour
                }
            });

            // Getting the sum of entries for the last hour
            // 1. Filter Result to get the entry for the last hour 
            // 2. Reduce entry values to a single sum
            // 3. Round result to the nearest whole number

            const sum = Math.floor(data.filter(item => {
                if (item.hour === hour && item.minute < 60) {
                    return item;
                } else if (item.hour === lastHour && (item.minute - minute) > 0) {
                    return item;
                }
            }).reduce((prev, curr) => prev += curr.value, 0));

            // Return result to client
            res.result = sum;
            successResponse(req, res);
        } catch (error) {
            // <Log Error Event>
            errorLogger().createError({
                type: eventType.REQUEST_ERROR,
                description: `Request for ${key} FAILED at ${new Date()}. REASON: An error occurred`,
                payload: {
                    key
                },
                meta: {
                    error
                }
            });
            // </Log Error Event>

            // Respond to client
            res.message = messageConstants.CATCH_MESSAGE;
            catchResponse(error, req, res, next);
        }
    },
    all: async (req, res, next) => {
        const { key } = req.params; // Get key from url params
        
        // <Log Request Event>
        eventLogger().createEvent({
            type: eventType.REQUEST,
            description: `New service request for ${key} at ${new Date()}`,
            payload: {
                key
            }
        });
        // </Log Request Event>

        // Get Data from Collection
        try {
            // Get entries from DB Collection
            const { data } = await collection().find();

            // Return result to client
            res.result = data;
            successResponse(req, res);
        } catch (error) {
            // <Log Error Event>
            errorLogger().createError({
                type: eventType.REQUEST_ERROR,
                description: `Request for ${key} FAILED at ${new Date()}. REASON: An error occurred`,
                payload: {
                    key
                },
                meta: {
                    error
                }
            });
            // </Log Error Event>

            // Respond to client
            res.message = messageConstants.CATCH_MESSAGE;
            catchResponse(error, req, res, next);
        }
    }
};