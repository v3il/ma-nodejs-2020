const knexInstance = require('./knexInstance');

const TABLE_NAME = 'users';

module.exports = {
    fetch(where = {}) {
        return knexInstance(TABLE_NAME)
            .where(where)
            .select();
    },

    create(newUser) {
        return knexInstance(TABLE_NAME).insert(newUser);
    },

    update(where = {}, newUser = {}) {
        return knexInstance(TABLE_NAME)
            .where(where)
            .update(newUser);
    },

    delete(where) {
        return knexInstance(TABLE_NAME)
            .where(where)
            .del();
    },
};
