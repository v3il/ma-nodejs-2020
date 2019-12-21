const router = require('../Router');

const { readAsset } = require('../util');

const mainPageFileContent = readAsset('index.html');

router.get('/', (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.write(mainPageFileContent);
    response.end();
});
