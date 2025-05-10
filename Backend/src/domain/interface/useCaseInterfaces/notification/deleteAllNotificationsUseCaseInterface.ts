export interface IdeleteAllNotificationUseCase {
    deleteAllNotifications(userId: string): Promise<boolean>
}