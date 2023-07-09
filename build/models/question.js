"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const tag_1 = __importDefault(require("./tag"));
//Define the Question model
class Question extends sequelize_1.Model {
    static associate(models) {
        Question.belongsTo(models.Tag, { foreignKey: 'tagId' });
    }
}
Question.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    authorId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    upvotes: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    downvotes: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    rating: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    tagId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'tags',
            key: 'id'
        }
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
    modelName: 'Question',
    tableName: `questions`,
    indexes: [
        {
            fields: ['body']
        }
    ]
});
// Define association between Question and Tag
Question.belongsTo(tag_1.default);
tag_1.default.hasMany(Question, {
    foreignKey: 'tagId',
});
exports.default = Question;
