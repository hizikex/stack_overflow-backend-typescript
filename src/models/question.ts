import { Model, DataTypes, Optional } from "sequelize";
import sequelize from '../config/config'
import QuestionTraits from "../interfaces/question";
import TagTraits from "../interfaces/tag";
import Tag from "./tag";

type QuestionTraitsCreation = Optional<QuestionTraits, 'id' | 'createdAt'| 'updatedAt' | 'tagId'>;

//Define the Question model
class Question extends Model <QuestionTraits, QuestionTraitsCreation>{
    public id!: number;
    public title!: string;
    public body!: string;
    public authorId!: string;
    public createdAt!: Date;
    public tags?: TagTraits[];

    public static associate(models: any): void {
        Question.belongsTo(models.Tag, { foreignKey: 'tagId' });
      }
}

Question.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tagId: {
        type: DataTypes.INTEGER,
        allowNull: true, // Make it non-nullable
        references: {
          model: 'tags', // Assuming the name of the Tag model is 'Tag' and the table name is 'tags'
          key: 'id'
        }
      },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'questions',
    indexes: [
        {
            fields: ['body']
        }
    ]
});

// Define association between Question and Tag
Question.belongsTo(Tag);
  
  Tag.hasMany(Question, {
    foreignKey: 'tagId',
  });

export default Question;