'use strict';
const Promise = require('bluebird');


function createDevice(deviceId) {
    return {
        deviceId,
        eventCount: 0,
        events: [],
        
        /**
         * Add an event to the device's list of events.
         * Assumes events are added in chronological order.
         * (returns promise so can be replaced by async IO, ex: write to db)
         * @param {Date} timestamp
         * @param {string} event
         * @return {Promise}
         */
        addEvent: function(timestamp, event) {
            this.events.push({timestamp, event});
            this.eventCount++;
            return Promise.resolve();
        },

        /**
         * Retrieve list of device's events.
         * (returns promise so can be replaced by async IO, ex: read from db)
         * @return {Promise} array of {timestamp, event}
         */
        getEvents: function() {
            return Promise.resolve(this.events);
        }
    };
};


module.exports = {
    createDevice
};