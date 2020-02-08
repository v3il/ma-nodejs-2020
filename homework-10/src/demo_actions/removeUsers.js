const { usersService } = require('../services');

module.exports = async userId => {
    return usersService.delete({ id: userId });
};
