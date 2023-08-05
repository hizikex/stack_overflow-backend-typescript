import express from "express";
import { createNotification, deleteNotification, getANotification, getNotifications, getNotified, markNotificationAsRead, updateNotification } from "../controllers/notifications";

const Router = express.Router();

Router.post('/notications/create', createNotification);
Router.get('/notications/readall', getNotifications);
Router.get('/notications/readone/:notificationId', getANotification);
Router.patch('/notications/update/:notificationId', updateNotification);
Router.get('/notications/delete/:notificationId', deleteNotification);
Router.get('/notications/received', getNotified);
Router.patch('/notications/:notificationId/markread', markNotificationAsRead);

export default Router;