'use strict'

function TopDevicesStore(numTop) {
    const numTopDevices = numTop;
    const topDevices = [];

    function findDeviceIndexWithMinCount() {
        let minIndex = 0;
        for (let x = 1; x < topDevices.length; x++) {
            if (topDevices[x].eventCount < topDevices[minIndex].eventCount) {
                minIndex = x;
            }
        }
        return minIndex;
    }

    /**
     * Maintains the top devices in the store.
     * Uses count of device events to determine which numTop devices to keep.
     * @param {obj} device {}
     */
    function update(device) {
        if (topDevices.indexOf(device) != -1) return;
        if (topDevices.length < numTopDevices) {
            topDevices.push(device);
        } else {
            const minIndex = findDeviceIndexWithMinCount();
            if (topDevices[minIndex].eventCount < device.eventCount) {
                topDevices[minIndex] = device;
            }
        }
    }

    /**
     * Returns the top devices.
     * @return {array}
     */
    function getTopDevices() {
        return topDevices;
    }

    return {
        update,
        getTopDevices
    }
};

module.exports = TopDevicesStore;