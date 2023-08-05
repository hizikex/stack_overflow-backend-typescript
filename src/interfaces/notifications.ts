interface NotificationTraits {
    id: number;
    userId: number;
    content: string;
    read: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export default NotificationTraits;