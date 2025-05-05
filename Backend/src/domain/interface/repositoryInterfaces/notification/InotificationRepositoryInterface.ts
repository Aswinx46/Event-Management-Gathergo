import { NotificationEntity } from "../../../entities/NotificationEntity";

export interface InotificationRepository {
    createNotification(notification: NotificationEntity): Promise<NotificationEntity>
}