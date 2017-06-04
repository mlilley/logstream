'use strict';
const fs = require('fs');
const split = require('split');

/**
 * Read file in in chunks, emit as individual lines.
 * (can replace by ex: reading from stdin, from network, etc.
 * @param {string} filename 
 * @return {Stream} emits log lines
 */
function logStreamFileReader(filename) {
    return fs.createReadStream(filename).pipe(split());
}

module.exports = logStreamFileReader;