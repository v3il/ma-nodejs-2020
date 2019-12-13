const getTotalMemory = require('./getTotalMemory');
const getFreeMemory = require('./getFreeMemory');

module.exports = () => getTotalMemory() - getFreeMemory();
