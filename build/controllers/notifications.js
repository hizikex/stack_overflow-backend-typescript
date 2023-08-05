"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markNotificationAsRead = exports.getNotified = exports.deleteNotification = exports.updateNotification = exports.getANotification = exports.getNotifications = exports.createNotification = void 0;
const notifications_1 = __importDefault(require("../models/notifications"));
const user_1 = __importDefault(require("../models/user"));
const createNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { content } = req.body;
        const notificationData = {
            userId: Number(userId),
            content,
        };
        const userObj = yield user_1.default.findByPk(userId);
        if (userObj) {
            const newNotification = yield notifications_1.default.create(notificationData);
            if (!newNotification) {
                res.status(404).json({
                    message: `Bad request`
                });
            }
            else {
                res.status(200).json({
                    message: "New notification created",
                    data: newNotification,
                });
            }
        }
        else {
            res.status(404).json({
                message: `User with id: ${userId} not found`,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: `Internal server error, ${error}`
        });
    }
});
exports.createNotification = createNotification;
const getNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allNotifications = yield notifications_1.default.findAll();
        if (!allNotifications) {
            res.status(404).json({
                message: `No notification created in the database`
            });
        }
        else {
            res.status(200).json({
                message: `All notifications are: ${allNotifications.length}`,
                data: allNotifications
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: `Failed to create a notification, ${error}`
        });
    }
});
exports.getNotifications = getNotifications;
const getANotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { notificationId } = req.params;
        const notification = yield notifications_1.default.findByPk(notificationId);
        if (!notification) {
            res.status(404).json({
                message: `No notification with id: ${notificationId}`
            });
        }
        else {
            res.status(200).json({
                message: `Notifications with id: ${notificationId}`,
                data: notification
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: `Failed to create a notification, ${error}`
        });
    }
});
exports.getANotification = getANotification;
const updateNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { notificationId } = req.params;
        const { content } = req.body;
        const notification = yield notifications_1.default.findByPk(notificationId);
        if (!notification) {
            res.status(404).json({
                message: `No notification with id: ${notificationId}`
            });
        }
        else {
            const updateNotification = yield notifications_1.default.update(content, { where: { id: notificationId } });
            res.status(200).json({
                message: `Notifications with id: ${notificationId} updated successfully`,
                data: updateNotification
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: `Failed to create a notification, ${error}`
        });
    }
});
exports.updateNotification = updateNotification;
const deleteNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { notificationId } = req.params;
        const deletedNotification = yield notifications_1.default.destroy({ where: { id: notificationId } });
        if (!deletedNotification) {
            res.status(404).json({
                message: `No notification with id: ${notificationId}`
            });
        }
        else {
            res.status(200).json({
                message: `Notifications with id: ${notificationId} deleted successfully`,
                data: deletedNotification
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: `Failed to create a notification, ${error}`
        });
    }
});
exports.deleteNotification = deleteNotification;
const getNotified = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const notifications = yield notifications_1.default.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']],
        });
        if (!notifications) {
            res.status(404).json({
                message: `Notification not found`
            });
        }
        else {
            res.status(200).json({
                message: `Notifications retrieved successfully`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: `Failed to retrieved notifications`,
            error: error
        });
    }
});
exports.getNotified = getNotified;
const markNotificationAsRead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { notificationId } = req.params;
        const notification = yield notifications_1.default.findByPk(notificationId);
        if (!notification) {
            res.status(404).json({
                message: `Notification not found`
            });
        }
        else {
            notification.read = true;
            yield notification.save();
            res.status(200).json({
                message: `Notifications marked as read`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: `Failed to retrieved notifications`,
            error: error
        });
    }
});
exports.markNotificationAsRead = markNotificationAsRead;
