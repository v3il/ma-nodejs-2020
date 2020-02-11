const http = require('http');

require('./prototypeExtensions');

const Router = require('./Router');
const setupRoutes = require('./routes');

const router = new Router();

router.setStaticDir('client/dist');
router.setViewsDir('src/views');

setupRoutes(router);

http.createServer(async (request, response) => {
    await router.resolve(request, response);
}).listen(process.env.PORT);
