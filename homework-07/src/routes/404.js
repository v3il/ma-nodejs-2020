const { readAsset } = require('../util');

module.exports = router => {
    router.get('/404', async (request, response) => {
        try {
            const content = await readAsset('404.html');

            response.setHeader('Content-Type', 'text/html');
            response.write(content);
            response.end();
        } catch (error) {
            console.error('404.html does not exist');
        }
    });
};
