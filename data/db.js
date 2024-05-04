const mysql = require('mysql2');
require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: "mysql",
    host: process.env.DB_HOST,
    storage: "./session.mysql",
    define: {
        timestamps: true
    }
});

async function connect() {
    try {
        await sequelize.sync({ alter: true  });
        await sequelize.authenticate();
        console.log("server running and all tables sync");
    }
    catch (err) {
        console.log(err)
    }
}

connect();

module.exports = sequelize;