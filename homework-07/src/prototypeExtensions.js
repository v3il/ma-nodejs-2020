const http = require('http');

const readAsset = require('./util/readAsset');

http.ServerResponse.prototype.sendJSON = function sendJSON(statusCode, data) {
    this.writeHead(statusCode, { 'Content-Type': 'application/json' }).end(JSON.stringify(data));
};

http.ServerResponse.prototype.redirect = function redirect(to) {
    this.writeHead(302, { Location: to }).end();
};

http.ServerResponse.prototype.renderPage = async function renderPage(pageFileName) {
    const content = await readAsset(pageFileName);

    this.setHeader('Content-Type', 'text/html');
    this.write(content);
    this.end();
};
