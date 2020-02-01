const fs = require('fs');
const { pipeline } = require('stream');
const config = require('../config');

const Transformer = require('./Transformer');

function sendJPEG(response) {
    const readStream = fs.createReadStream(config.filePath);
    const transformer = new Transformer();

    pipeline(readStream, transformer, response, error => {
        if (error) {
            console.error('Failed to send image buffer!', error.stack);
            return response.emit('error', new Error('Failed to send image!'));
        }

        return console.log('Ok');
    });

    // readStream.on('error', error => {
    //     console.error('Failed to send image buffer!', error.stack);
    //     res.emit('error', new Error('Failed to send image!'));
    // });
    //
    // readStream.pipe(res);
    //
    // readStream.on('data', () => {
    //     // console.log('Data');
    // });
    //
    // res.on('drain', () => {
    //     process.stdout.write('*');
    // });

    // fsp.readFile(config.filePath)
    //     .then(buffer => res.end(buffer))
    //     .catch(err => {
    //         console.error('Failed to send image buffer!', err.stack);
    //         res.emit('error', new Error('Failed to send image!'));
    //     });
}

module.exports = {
    sendJPEG,
};
