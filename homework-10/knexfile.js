require('dotenv').config();

const config = {
    client: 'mysql',
    version: '5.7',

    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },

    pool: {
        min: 2,
        max: 10,
    },

    migrations: {
        tableName: 'migrations',
    },
};

module.exports = {
    development: config,
    production: config,
};
