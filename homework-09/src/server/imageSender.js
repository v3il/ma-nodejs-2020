const fs = require('fs');
const { pipeline } = require('stream');
const config = require('../config');

const SpeedLimiter = require('./SpeedLimiter');

function sendJPEG(response) {
    const { filePath, limit, minLimit, statusSymbol } = config;

    const readStream = fs.createReadStream(filePath);
    const speedLimiter = new SpeedLimiter(Math.max(limit, minLimit));

    speedLimiter.on('megabyte-transferred', () => {
        process.stdout.write(statusSymbol);
    });

    console.log('Download started');

    pipeline(readStream, speedLimiter, response, error => {
        if (error) {
            console.error('Failed to send image buffer!', error.stack);
            response.emit('error', new Error('Failed to send image!'));
        } else {
            console.log('\nDownload finished');
        }
    });
}

module.exports = {
    sendJPEG,
};
