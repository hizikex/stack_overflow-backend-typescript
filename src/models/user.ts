import { Model, DataTypes, Optional } from "sequelize";
import sequelize from '../config/config'
import UserTraits from '../interfaces/user';

type UserTraitsCreation = Optional<UserTraits, 'id' | 'token' | 'isVerify' |'reputation'| 'createdAt' | 'updatedAt'>;

//Define the user Model
class User extends Model <UserTraits, UserTraitsCreation>{
    public id!: string;
    public username!: string;
    public email!: string;
    public password!: string;
    public phone!: string;
    public token!: string;
    public location!: string;
    public isVerify!: boolean;
    public reputation!: number;
    public createdAt!: Date;
    public updatedAt!: Date
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isVerify: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    reputation: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
    modelName: 'User',
    tableName: 'users'
})

// // Synchronize the model with the database

// User.sync()
//   .then(() => {
//     console.log('User table created successfully');
//   })
//   .catch((error) => {
//     console.error('Error creating user table:', error);
//   });

export default User;