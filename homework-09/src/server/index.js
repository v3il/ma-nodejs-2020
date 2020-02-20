const http = require('http');

const { endResponse } = require('./helpers');
const { sendJPEG } = require('./imageSender');
const config = require('../config');

function handleRequest(request, response) {
    response.on('error', err => {
        console.error('Response error:', err.stack);
        endResponse(response, 500);
    });

    if (request.method === 'GET' && request.url === '/image') {
        response.setHeader('Content-type', 'image/jpeg');
        sendJPEG(response);
        return;
    }

    endResponse(response, 404);
}

function start() {
    const server = http.createServer(handleRequest);

    server.on('error', err => {
        console.error('Server error:', err.stack);
        server.close();
        setTimeout(() => start(), 500); // restart server in 0.5 sec
    });

    server.listen(config.port, () => {
        const addressInfo = server.address();
        console.log(`Server is listening on: [${addressInfo.address}]:${addressInfo.port}`);
    });
}

module.exports = {
    start,
};
