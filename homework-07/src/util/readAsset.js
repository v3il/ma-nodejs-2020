const fsp = require('fs').promises;
const path = require('path');

module.exports = async fileName => {
    return fsp.readFile(path.join(process.cwd(), 'assets', fileName));
};
