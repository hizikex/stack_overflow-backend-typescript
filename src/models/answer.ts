import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/config";
import AnswerTraits from "../interfaces/answer";

type AnswerTraitsCreation = Optional<AnswerTraits, 'id'| 'createdAt'| 'updatedAt'| 'questionId'>

class Answer extends Model <AnswerTraits, AnswerTraitsCreation>{
  public id!: number;
  public body!: string;
  public authorId!: number;
  public questionId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  //Association defined here
  public static associate(models: any): void {
    Answer.belongsTo(models.Question, {foreignKey: 'questionId'});
  }
}

Answer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Answer",
    tableName: 'answers'
  }
);

export default Answer;