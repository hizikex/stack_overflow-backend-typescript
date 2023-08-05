import { Request, Response } from "express";
import Notification from "../models/notifications";
import User from "../models/user";

export const createNotification = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        const {content} = req.body;

        type NotificationTrait = {
            userId?: number;
            content: string;
        };

        const notificationData: NotificationTrait = {
            userId: Number(userId),
            content,
        };

        const userObj = await User.findByPk(userId)
        if (userObj) {
            const newNotification = await Notification.create(notificationData);

            if ( !newNotification ) {
                res.status(404).json({
                    message: `Bad request`
                })
            } else {
                res.status(200).json({
                    message: "New notification created",
                    data: newNotification,
                  });
            }
        } else {
            res.status(404).json({
                message: `User with id: ${userId} not found`,
              });
        }
    } catch (error) {
        res.status(500).json({
            message: `Internal server error, ${error}`
        })
    }
};

export const getNotifications = async (req: Request, res: Response) => {
    try {
        const allNotifications = await Notification.findAll();
        if ( !allNotifications ) {
            res.status(404).json({
                message: `No notification created in the database`
            })
        } else {
            res.status(200).json({
                message: `All notifications are: ${allNotifications.length}`,
                data: allNotifications
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Failed to create a notification, ${error}`
        })
    }
};

export const getANotification = async (req: Request, res: Response) => {
    try {
        const {notificationId} = req.params;
        const notification = await Notification.findByPk(notificationId);
        if ( !notification ) {
            res.status(404).json({
                message: `No notification with id: ${notificationId}`
            });
        } else {
            res.status(200).json({
                message: `Notifications with id: ${notificationId}`,
                data: notification
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Failed to create a notification, ${error}`
        })
    }
};

export const updateNotification = async (req: Request, res: Response) => {
    try {
        const {notificationId} = req.params;
        const {content} = req.body;
        const notification = await Notification.findByPk(notificationId);
        if ( !notification ) {
            res.status(404).json({
                message: `No notification with id: ${notificationId}`
            });
        } else {
            const updateNotification = await Notification.update(content, {where: {id: notificationId}});
            res.status(200).json({
                message: `Notifications with id: ${notificationId} updated successfully`,
                data: updateNotification
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Failed to create a notification, ${error}`
        })
    }
};

export const deleteNotification = async (req: Request, res: Response) => {
    try {
        const {notificationId} = req.params;
        const deletedNotification = await Notification.destroy({where: {id: notificationId}});

        if ( !deletedNotification ) {
            res.status(404).json({
                message: `No notification with id: ${notificationId}`
            });
        } else {
            res.status(200).json({
                message: `Notifications with id: ${notificationId} deleted successfully`,
                data: deletedNotification
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Failed to create a notification, ${error}`
        })
    }
};

export const getNotified = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        const notifications = await Notification.findAll({
            where: {userId},
            order: [['createdAt', 'DESC']],
        });
        
        if ( !notifications ) {
            res.status(404).json({
                message: `Notification not found`
            })
        } else {
            res.status(200).json({
                message: `Notifications retrieved successfully`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Failed to retrieved notifications`,
            error: error
        })
    }
};

export const markNotificationAsRead = async (req:Request, res: Response) => {
    try {
        const {notificationId} = req.params;
        const notification = await Notification.findByPk(notificationId);
        if ( !notification) {
            res.status(404).json({
                message: `Notification not found`
            })
        } else {
            notification.read = true;
            await notification.save();
            res.status(200).json({
                message: `Notifications marked as read`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Failed to retrieved notifications`,
            error: error
        })
    }
};