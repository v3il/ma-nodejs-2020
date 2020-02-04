const fs = require('fs');
const { pipeline } = require('stream');
const config = require('../config');

const Transformer = require('./Transformer');

function sendJPEG(response) {
    const { filePath, limit, minLimit } = config;

    const readStream = fs.createReadStream(filePath);
    const transformer = new Transformer(Math.max(limit, minLimit));

    transformer.on('megabyte-transferred', () => {
        process.stdout.write('.');
    });

    console.log('Download started');

    pipeline(readStream, transformer, response, error => {
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
