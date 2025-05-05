import { NotificationEntity } from "../../../entities/NotificationEntity";

export interface IcreateNotificationUseCase {
    createNotification(notification: NotificationEntity): Promise<NotificationEntity>
}