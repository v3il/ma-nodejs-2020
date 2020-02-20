const { User } = require('./models');

module.exports = {
    fetch(where = {}) {
        return User.findAll(where);
    },

    create(newUser) {
        return User.create(newUser);
    },

    async update(where = {}, newUser = {}) {
        return User.update(newUser, { where });
    },

    delete(where) {
        return User.destroy({ where });
    },
};
