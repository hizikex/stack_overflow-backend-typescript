import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/config";
import User from "./user";
import NotificationTraits from "../interfaces/notifications";

type NotificationTraitsCreation = Optional<NotificationTraits, 'id'| 'userId'| 'read'| 'createdAt'| 'updatedAt'>;

//Define the Notification model
class Notification extends Model <NotificationTraits, NotificationTraitsCreation> {
    public id!: number;
    public userId!: number;
    public content!: string;
    public read!: boolean;
    public createdAt!: Date;
    public updatedAt!: Date;

    public static associate(models: any): void {
        Notification.belongsTo(models.Tag, { foreignKey: 'userId' });
      }
};

Notification.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'userId',
            key: 'id'
        }
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    },
    {
      sequelize,
      modelName: 'Notification',
      tableName: 'notifications',
    }
  );

  //Define association between the NOtification and the User;
  Notification.belongsTo(User);

  User.hasMany(Notification, {
    foreignKey: 'tagId',
  });

  export default Notification;