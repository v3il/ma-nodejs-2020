require('dotenv').config();

const config = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
        bigNumberStrings: true,
    },
};

module.exports = {
    development: config,
    production: config,
};
