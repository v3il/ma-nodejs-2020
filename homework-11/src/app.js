require('dotenv').config();

const http = require('http');
const { sequelize } = require('./models');

require('./prototypeExtensions');

const Router = require('./Router');
const setupRoutes = require('./routes');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to DB');
    } catch (error) {
        console.log('Unable connect to DB:', error.message);
    }
})();

const router = new Router();

router.setStaticDir('client/dist');
router.setViewsDir('src/views');

setupRoutes(router);

http.createServer(async (request, response) => {
    await router.resolve(request, response);
}).listen(process.env.PORT);
