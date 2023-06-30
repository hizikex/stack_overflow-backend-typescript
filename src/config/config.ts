import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
    database: process.env.MY_SQL_DB,
    username: process.env.MY_SQL_USER,
    password: process.env.MY_SQL_PASS,
    dialect: 'mysql',
    host: '127.0.0.1',
    define: {
        timestamps: true
    }
});

export default sequelize;