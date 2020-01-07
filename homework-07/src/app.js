const http = require('http');

require('./prototypeExtensions');

const Router = require('./Router');
const setupRoutes = require('./routes');

const router = new Router();

setupRoutes(router);

http.createServer(async (request, response) => {
    await router.resolve(request, response);
}).listen(3000);
