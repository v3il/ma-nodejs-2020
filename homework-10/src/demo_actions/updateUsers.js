const { usersService } = require('../services');

module.exports = async userId => {
    return usersService.update({ id: userId }, { login: 'Dan' });
};
