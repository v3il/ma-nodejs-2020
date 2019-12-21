const router = require('../Router');

const { readAsset } = require('../util');

const page404FileContent = readAsset('404.html');

router.get('/404', (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.write(page404FileContent);
    response.end();
});
