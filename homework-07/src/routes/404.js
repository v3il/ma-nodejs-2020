const http = require('http');
const readAsset = require('../util/readAsset');

module.exports = router => {
    router.get('/404', async (request, response) => {
        try {
            const content = await readAsset('404.html');

            response.setHeader('Content-Type', 'text/html');
            response.write(content);
            response.end();
        } catch (error) {
            console.error('404.html does not exist');

            response.sendJSON(404, {
                url: '/404',
                message: http.STATUS_CODES[404],
            });
        }
    });
};
