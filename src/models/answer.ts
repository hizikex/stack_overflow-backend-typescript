import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/config";
import AnswerTraits from "../interfaces/answer";
import Question from "./question";

type AnswerTraitsCreation = Optional<AnswerTraits, 'id'| 'rating'| 'createdAt'| 'updatedAt'| 'questionId'>

class Answer extends Model <AnswerTraits, AnswerTraitsCreation>{
  public id!: number;
  public body!: string;
  public authorId!: number;
  public questionId!: number;
  public upvotes!: number;
  public downvotes!: number;
  public rating!: number;

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
      references: {
        model: 'answers',
        key: 'id'
      }
    },
    upvotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    downvotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
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
    tableName: 'answers',
    indexes: [
      {
        fields: ['body']
      }
    ]
  }
);



//Set up association between Answer and Question model
Answer.belongsTo(Question, {
  foreignKey: 'questionId',
  onDelete: 'CASCADE', // If question is deleted, it deletes its associated answers
});

// If you want to define the association from the Question model as well:
Question.hasMany(Answer, {
  foreignKey: 'questionId',
});


export default Answer;