// Домашнее задание №10: Создать проект, в котором реализовать подключение к локальной БД
// (postgresql, mysql, sqlite - любая на усмотрение, но первые две предпочтительнее т.к. такой вариант чуток сложнее),
// Создать в БД таблицу пользователей users с полями: id, login, password, token, реализовать методы CRUD (create, read, update, delete) для записей этой таблицы.
// Использование docker и реализация миграций тоже на собственное усмотрение.

exports.up = function(knex) {
    knex.schema.createTableIfNotExists('users', table => {
        table.increments('id');
        table.string('login').notNullable();
        table.string('password').notNullable();
        table.string('token').notNullable();
    });
};

exports.down = function(knex) {
    knex.schema.dropTable('users');
};
