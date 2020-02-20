const http = require('http');

/**
 * End http response with code and
 * show default code message
 * @param {http.ServerResponse} response -  HTTP server response object
 * @param {number} code - status code (100...599)
 */
function endResponse(response, code) {
    response.writeHead(code, { 'Content-Type': 'text/html' });
    response.end(http.STATUS_CODES[code]);
}

module.exports = {
    endResponse,
};
