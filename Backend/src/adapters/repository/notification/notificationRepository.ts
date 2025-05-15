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
    async deleteSingleNotification(notificationdId: string): Promise<boolean> {
        const deleteNotification = await notificationModal.findByIdAndDelete(notificationdId)
        if (!deleteNotification) throw new Error('No notification found in this ID')
        return true
    }
    async readNotification(notificationId: string): Promise<boolean> {
        const readNotification = await notificationModal.findByIdAndUpdate(notificationId, { read: true }, { new: true })
        if (!readNotification) throw new Error('No notification found in this ID')
        return true
    }

}