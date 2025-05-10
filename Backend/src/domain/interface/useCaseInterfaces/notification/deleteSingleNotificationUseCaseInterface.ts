export interface IdeleteSingleNotificationUseCase {
    deleteSingleNotification(notificationdId: string): Promise<boolean>
}