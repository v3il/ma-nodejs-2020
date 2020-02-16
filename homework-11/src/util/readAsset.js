const fsp = require('fs').promises;
const path = require('path');

module.exports = async assetPath => {
    return fsp.readFile(path.join(process.cwd(), assetPath));
};
