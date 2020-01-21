/* eslint-disable global-require */
module.exports = router => {
    [
        require('./main'),
        require('./limit'),
        require('./metrics'),
        require('./404'),
    ].forEach(initRoute => initRoute(router));
};
