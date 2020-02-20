/* eslint-disable global-require */
module.exports = router => {
    [
        require('./main'),
        require('./404'),
        require('./getUsers'),
        require('./saveUser'),
        require('./deleteUser'),
    ].forEach(initRoute => initRoute(router));
};
