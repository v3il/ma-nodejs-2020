const os = require('os');

const getTotalMemory = () => os.totalmem();
const getFreeMemory = () => os.freemem();
const getUsedMemory = () => getTotalMemory() - getFreeMemory();

module.exports = {
    getTotalMemory,
    getFreeMemory,
    getUsedMemory,
};
