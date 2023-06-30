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
    constructor(values, option) {
        super(values, Object.assign(Object.assign({}, option), { sequelize: config_1.default }));
    }
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
    tagId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'tags',
            key: 'id'
        }
    },
    // tagId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: true
    // },
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
    modelName: 'questions'
});
// Define association between Question and Tag
Question.belongsTo(tag_1.default);
tag_1.default.hasMany(Question, {
    foreignKey: 'tagId',
});
//   Question.belongsTo(Tag, { as: 'tags', foreignKey: 'questionId' });
//   Tag.hasMany(Question, { as: 'questions', foreignKey: 'questionId' });
exports.default = Question;
