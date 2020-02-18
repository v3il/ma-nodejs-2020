const fs = require('fs');
const { pipeline } = require('stream');
const config = require('../config');

const SpeedLimiter = require('./SpeedLimiter');

function sendJPEG(response) {
    const { filePath, limit, minLimit, statusSymbol } = config;

    const readStream = fs.createReadStream(filePath);

    readStream.on('error', error => {
        console.error('Failed to read image!', error);
        response.emit('error', new Error('Failed to read image!'));
    });

    const speedLimiter = new SpeedLimiter(Math.max(limit, minLimit));

    speedLimiter.on('megabyte-transferred', () => {
        process.stdout.write(statusSymbol);
    });

    speedLimiter.on('error', error => {
        console.error('Failed to transform image data!', error);
        response.emit('error', new Error('Failed to transform image data!'));
    });

    console.log('Download started');

    pipeline(readStream, speedLimiter, response, error => {
        if (error) {
            console.error('Failed to send image buffer!', error);
        } else {
            console.log('\nDownload finished');
        }
    });
}

module.exports = {
    sendJPEG,
};
