import { NotificationDTO } from "../../../domain/entities/NotificationDTO";
import { NotificationEntity } from "../../../domain/entities/NotificationEntity";
import { InotificationRepository } from "../../../domain/interface/repositoryInterfaces/notification/InotificationRepositoryInterface";
import { notificationModal } from "../../../framerwork/database/models/notificationModel";

export class NotificationRepository implements InotificationRepository {
    async createNotification(notification: NotificationEntity): Promise<NotificationEntity> {
        return notificationModal.create(notification)
    }
    async deleteNotifications(userId: string): Promise<boolean> {
        const deletedNotifications = await notificationModal.deleteMany({ to: userId });

        // If at least one notification was deleted, return true
        return deletedNotifications.deletedCount > 0;
    }
    async findNotifications(userId: string): Promise<NotificationDTO[] | {}> {
        const notifications = await notificationModal.find({ to: userId }).populate('from', '_id name profileImage')
        return notifications
    }
}