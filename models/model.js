const { DataTypes } = require('sequelize');
const sequelize = require("../data/db");


const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birth: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duty: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_img: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const Admin = sequelize.define("admin", {
    id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "ADMIN"
    }
});

const Message = sequelize.define("message", {
    id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    send_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

User.hasMany(Message)
Message.belongsTo(User)



Admin.findOrCreate({ where: { email: "admin@gmail.com", password: "$2b$10$ppLSj03K./oeMqaDKYEpTehMP5/Nxp5JzmppDXbygn/ReZMhwBe5W", role: "ADMIN" } })


module.exports = {
    Admin,
    User,
    Message
};