const initRoute404 = require('./404');
const initMainRoute = require('./main');
const initLimitRoutes = require('./limit');
const initMetricsRoutes = require('./metrics');

module.exports = router => {
    initRoute404(router);
    initMainRoute(router);
    initMetricsRoutes(router);
    initLimitRoutes(router);
};
