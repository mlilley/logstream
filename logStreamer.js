'use strict';
const NUM_TOP_DEVICES = 2;

const logStreamFileReader = require('./logStreamFileReader');
const logLineParser = require('./logLineParser');
const deviceStore = require('./InMemoryDeviceStore')();
const topDevicesStore = require('./TopDevicesStore')(NUM_TOP_DEVICES);


/**
 * Invoke this via some means (ie: in proc http server listing for 
 * requests to show top devices) to display top devices (currently
 * to console).
 */
function showTopDevices(store) {
    store.getTopDevices().forEach(device => {
        device.getEvents().then(events => {
            console.log(`Device ${device.deviceId}:`);
            events.forEach(event => console.log(`  ${event.timestamp} ${event.event}`));
        });
    });
};


/**
 * Stream lines in, parse them, add them to the device store, and 
 * update the top devices.
 */
logStreamFileReader('input.log').on('data', (line) => {
    logLineParser(line).then(deviceEvent => {
        deviceStore.addDevice(deviceEvent).then(device => {
            topDevicesStore.update(device);
        });
    }).catch(e => console.log(`error: ${e.message}`));
}).on('end', () => {
    showTopDevices(topDevicesStore);
});
