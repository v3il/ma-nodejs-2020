const http = require('http');

const router = require('./Router');
const setupRoutes = require('./routes');

setupRoutes(router);

const PORT = 3000;

http.createServer(async (request, response) => {
    await router.resolve(request, response);
}).listen(PORT);
