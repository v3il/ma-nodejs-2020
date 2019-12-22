const readAsset = require('../util/readAsset');

module.exports = router => {
    router.get('/', async (request, response) => {
        try {
            const content = await readAsset('index.html');

            response.setHeader('Content-Type', 'text/html');
            response.write(content);
            response.end();
        } catch (error) {
            console.error('index.html does not exist');
            response.redirect('/404');
        }
    });
};
