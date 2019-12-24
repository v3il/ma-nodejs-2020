const http = require('http');

const Router = require('./Router');
const setupRoutes = require('./routes');

const router = new Router();
setupRoutes(router);

http.ServerResponse.prototype.sendJSON = function sendJSON(statusCode, data) {
    this.writeHead(statusCode, { 'Content-Type': 'application/json' }).end(JSON.stringify(data));
};

http.ServerResponse.prototype.redirect = function redirect(to) {
    this.writeHead(302, { Location: to }).end();
};

const PORT = 3000;

http.createServer(async (request, response) => {
    await router.resolve(request, response);
}).listen(PORT);
