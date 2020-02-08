const { usersService } = require('../services');

module.exports = async () => {
    return usersService.fetch();
};
