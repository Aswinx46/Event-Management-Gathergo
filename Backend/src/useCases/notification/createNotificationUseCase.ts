import { NotificationEntity } from "../../domain/entities/NotificationEntity";
import { InotificationRepository } from "../../domain/interface/repositoryInterfaces/notification/InotificationRepositoryInterface";
import { IcreateNotificationUseCase } from "../../domain/interface/useCaseInterfaces/notification/createNotificationUseCaseInterface";

export class CreateNotificationUseCase implements IcreateNotificationUseCase {
    private notificationDatabase: InotificationRepository
    constructor(notificationDatabase: InotificationRepository) {
        this.notificationDatabase = notificationDatabase
    }
    async createNotification(notification: NotificationEntity): Promise<NotificationEntity> {
        return await this.notificationDatabase.createNotification(notification)
    }
}