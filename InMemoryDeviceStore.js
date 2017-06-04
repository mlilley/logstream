'use strict';
const device = require('./Device');

function createStore() {
    const devices = {};

    /**
     * Add (or update) a device in the store.
     * (returns promise so can replace w/ async io operation, ex: write to db)
     * @param {Obj} deviceEvent { timestamp, deviceId, event }
     * @return {Promise} new/updated device
     */
    function addDevice(deviceEvent) {
        let dev = devices[deviceEvent.deviceId];
        if (dev) {
            dev.addEvent(deviceEvent.timestamp, deviceEvent.event);
        } else {
            dev = device.createDevice(deviceEvent.deviceId);
            dev.addEvent(deviceEvent.timestamp, deviceEvent.event);
            devices[deviceEvent.deviceId] = dev;
        }
        return Promise.resolve(dev);
    }

    return {
        addDevice
    };
}

module.exports = createStore;