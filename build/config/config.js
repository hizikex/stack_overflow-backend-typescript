"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize = new sequelize_typescript_1.Sequelize({
    database: process.env.MY_SQL_DB,
    username: process.env.MY_SQL_USER,
    password: process.env.MY_SQL_PASS,
    dialect: 'mysql',
    host: '127.0.0.1',
    define: {
        timestamps: true
    }
});
exports.default = sequelize;
