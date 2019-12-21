const http = require('http');

const router = require('./Router');
require('./routes');

const PORT = 3000;

http.createServer(async (request, response) => {
    await router.resolve(request, response);
}).listen(PORT);
