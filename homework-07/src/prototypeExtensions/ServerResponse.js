const http = require('http');

const readAsset = require('../util/readAsset');

http.ServerResponse.prototype.sendJSON = function sendJSON(statusCode, data, headers = {}) {
    this.writeHead(statusCode, { 'Content-Type': 'application/json', ...headers }).end(
        JSON.stringify(data),
    );
};

http.ServerResponse.prototype.redirect = function redirect(to) {
    this.writeHead(302, { Location: to }).end();
};

http.ServerResponse.prototype.renderView = async function renderView(pageFileName) {
    const content = await readAsset(`${this.viewsDir}/${pageFileName}`);

    this.setHeader('Content-Type', 'text/html');
    this.write(content);
    this.end();
};
