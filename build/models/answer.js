"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const question_1 = __importDefault(require("./question"));
class Answer extends sequelize_1.Model {
    //Association defined here
    static associate(models) {
        Answer.belongsTo(models.Question, { foreignKey: 'questionId' });
    }
}
Answer.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    body: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    authorId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    questionId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'answers',
            key: 'id'
        }
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
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: config_1.default,
    modelName: "Answer",
    tableName: 'answers',
    indexes: [
        {
            fields: ['body']
        }
    ]
});
//Set up association between Answer and Question model
Answer.belongsTo(question_1.default, {
    foreignKey: 'questionId',
    onDelete: 'CASCADE', // If question is deleted, it deletes its associated answers
});
// If you want to define the association from the Question model as well:
question_1.default.hasMany(Answer, {
    foreignKey: 'questionId',
});
exports.default = Answer;
