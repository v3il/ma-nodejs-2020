/* eslint-disable global-require */
module.exports = router => {
    [
        require('./main'),
        require('./404'),
        require('./getUsers'),
        require('./createUser'),
        require('./updateUser'),
        require('./deleteUser'),
    ].forEach(initRoute => initRoute(router));
};
