exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id');
        table.string('login').notNullable();
        table.string('password').notNullable();
        table.string('token').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};