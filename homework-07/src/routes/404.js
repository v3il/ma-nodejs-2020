const http = require('http');

module.exports = router => {
    router.get('/404', async (request, response) => {
        try {
            await response.renderPage('404.html');
        } catch (error) {
            console.error('404.html does not exist');

            response.sendJSON(404, {
                url: '/404',
                message: http.STATUS_CODES[404],
            });
        }
    });
};
