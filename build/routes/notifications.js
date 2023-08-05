"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notifications_1 = require("../controllers/notifications");
const Router = express_1.default.Router();
Router.post('/notications/create', notifications_1.createNotification);
Router.get('/notications/readall', notifications_1.getNotifications);
Router.get('/notications/readone/:notificationId', notifications_1.getANotification);
Router.patch('/notications/update/:notificationId', notifications_1.updateNotification);
Router.get('/notications/delete/:notificationId', notifications_1.deleteNotification);
Router.get('/notications/received', notifications_1.getNotified);
Router.patch('/notications/:notificationId/markread', notifications_1.markNotificationAsRead);
exports.default = Router;
