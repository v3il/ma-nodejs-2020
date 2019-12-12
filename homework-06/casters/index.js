const toNumber = require('./toNumber');
const toBoolean = require('./toBoolean');
const toString = require('./toString');

function cast(value, type) {
    if (type === 'number') {
        return toNumber(value);
    }
    if (type === 'boolean') {
        return toBoolean(value);
    }
    return toString(value);
}

module.exports = cast;
