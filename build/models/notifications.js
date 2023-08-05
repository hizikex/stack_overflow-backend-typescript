"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const user_1 = __importDefault(require("./user"));
//Define the Notification model
class Notification extends sequelize_1.Model {
    static associate(models) {
        Notification.belongsTo(models.Tag, { foreignKey: 'userId' });
    }
}
;
Notification.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'userId',
            key: 'id'
        }
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    read: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    }
}, {
    sequelize: config_1.default,
    modelName: 'Notification',
    tableName: 'notifications',
});
//Define association between the NOtification and the User;
Notification.belongsTo(user_1.default);
user_1.default.hasMany(Notification, {
    foreignKey: 'tagId',
});
exports.default = Notification;
