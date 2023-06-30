import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/config";
import TagTraits from "../interfaces/tag";
import Question from "./question";

type TagCreationTraits = Optional<TagTraits, 'id' |'createdAt' | 'updatedAt'>;

//Define the tag model
class Tag extends Model <TagTraits, TagCreationTraits>{
    public id!: number;
    public name!: string;

    public createdAt!: Date;
    public updatedAt!: Date;
}

Tag.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
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
    modelName: 'tags'
})

  export default Tag;