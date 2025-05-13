import { InotificationRepository } from "../../domain/interface/repositoryInterfaces/notification/InotificationRepositoryInterface";
import { IreadNotificationUseCase } from "../../domain/interface/useCaseInterfaces/notification/readNotificationUseCaseInterface";

export class ReadNotificationUseCase implements IreadNotificationUseCase {
    private notificationDatabase: InotificationRepository
    constructor(notificationDatabase: InotificationRepository) {
        this.notificationDatabase = notificationDatabase
    }
    async readNotification(notificationId: string): Promise<boolean> {
        return await this.notificationDatabase.readNotification(notificationId)
    }
}