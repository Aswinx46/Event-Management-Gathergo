import { InotificationRepository } from "../../domain/interface/repositoryInterfaces/notification/InotificationRepositoryInterface";
import { IdeleteAllNotificationUseCase } from "../../domain/interface/useCaseInterfaces/notification/deleteAllNotificationsUseCaseInterface";

export class DeleteAllNotificationsUseCase implements IdeleteAllNotificationUseCase {
    private notificationDatabase: InotificationRepository
    constructor(notificationDatabase: InotificationRepository) {
        this.notificationDatabase = notificationDatabase
    }
    async deleteAllNotifications(userId: string): Promise<boolean> {
        return await this.notificationDatabase.deleteNotifications(userId)
    }
}