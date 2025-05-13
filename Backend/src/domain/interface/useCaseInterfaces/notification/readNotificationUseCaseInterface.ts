export interface IreadNotificationUseCase {
    readNotification(notificationId: string): Promise<boolean>
}