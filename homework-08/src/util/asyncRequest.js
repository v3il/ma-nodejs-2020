const http = require('http');

module.exports = options => {
    return new Promise((resolve, reject) => {
        const request = http.request(options, response => {
            response.setEncoding('utf8');

            let rawData = '';

            response.on('data', chunk => {
                rawData += chunk;
            });

            response.on('end', () => {
                resolve(rawData);
            });
        });

        request.on('error', error => {
            reject(error);
        });

        request.end();
    });
};
