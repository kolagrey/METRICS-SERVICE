// In-memory datastore for storing metric entries using NeDB

const Datastore = require('nedb');
const db = new Datastore();

const { present } = require('../utils');

const collection = () => ({
    create: ({ key, value }) => {
        return new Promise((resolve, reject) => {
            const { minute, hour, day, dayOfWeek, month, year, dateTime: createdAt } = present();
            db.insert({
                key, value, minute, hour, day, dayOfWeek, month, year, createdAt
            }, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({ data });
                }
            });
        });
    },

    find: (condition = {}) => {
        return new Promise((resolve, reject) => {
            db.find(condition, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({ data });
                }
            });
        });
    },

    remove: (condition = {}) => {
        return new Promise((resolve, reject) => {
            db.remove(condition, { multi: true }, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({ data });
                }
            });
        });
    }
});

module.exports = {
    collection
};