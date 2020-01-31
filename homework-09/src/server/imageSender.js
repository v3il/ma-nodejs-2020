const fsp = require('fs').promises;
const config = require('../config');

function sendJPEG(res) {
    fsp.readFile(config.filePath)
        .then(buffer => res.end(buffer))
        .catch(err => {
            console.error('Failed to send image buffer!', err.stack);
            res.emit('error', new Error('Failed to send image!'));
        });
}

module.exports = {
    sendJPEG,
};
