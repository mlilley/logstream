'use strict';
const Promise = require('bluebird');


function parseTimestamp(str) {
    return new Date(str);
}

function parseDeviceId(str) {
    return str;
}

function parseEvent(str) {
    return str;
}

module.exports = function parseLine(line) {
    return Promise.try(() => {
        const bits = line.split(/\s+/);
        if (bits.length == 3) {
            const timestamp = parseTimestamp(bits[0]);
            const deviceId = parseDeviceId(bits[1]);
            const event = parseEvent(bits[2]);
            return { timestamp, deviceId, event };
        } else {
            throw new Error('encountered invalid line (not 3 parts');
        }
    });
}
