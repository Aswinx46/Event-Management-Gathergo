import { NotificationEntity } from "../../../domain/entities/NotificationEntity";
import { InotificationRepository } from "../../../domain/interface/repositoryInterfaces/notification/InotificationRepositoryInterface";
import { notificationModal } from "../../../framerwork/database/models/notificationModel";

export class NotificationRepository implements InotificationRepository {
    async createNotification(notification: NotificationEntity): Promise<NotificationEntity> {
        return notificationModal.create(notification)
    }
}