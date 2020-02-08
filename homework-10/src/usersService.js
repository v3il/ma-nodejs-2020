const knexInstance = require('./knexInstance');

const TABLE_NAME = 'users';

module.exports = {
    async fetch(where = {}) {
        return knexInstance(TABLE_NAME)
            .where(where)
            .select();
    },

    async create(newUser) {
        return knexInstance(TABLE_NAME).insert(newUser);
    },

    async update(where = {}, newUser = {}) {
        return knexInstance(TABLE_NAME)
            .where(where)
            .update(newUser);
    },

    async delete(where) {
        return knexInstance(TABLE_NAME)
            .where(where)
            .del();
    },
};
