require('./404');
require('./main');
require('./limit');
require('./metrics');

const router = require('../Router');

module.exports = async (request, response) => {
    await router.resolve(request, response);
};
