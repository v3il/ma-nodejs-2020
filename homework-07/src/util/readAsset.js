const fs = require('fs');
const path = require('path');

module.exports = fileName => {
    return fs.readFileSync(path.join(process.cwd(), 'assets', fileName));
};
