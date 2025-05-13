import { NotificationEntity } from "../../../entities/NotificationEntity";

export interface InotificationRepository {
    createNotification(notification: NotificationEntity): Promise<NotificationEntity>
    findNotifications(userId: string): Promise<NotificationEntity[] | {}>
    deleteNotifications(userId: string): Promise<boolean>
    deleteSingleNotification(notificationdId: string): Promise<boolean>
    readNotification(notificationId: string): Promise<boolean>
}