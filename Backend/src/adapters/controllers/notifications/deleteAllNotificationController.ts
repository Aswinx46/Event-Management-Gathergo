import { Request, Response } from "express";
import { IdeleteAllNotificationUseCase } from "../../../domain/interface/useCaseInterfaces/notification/deleteAllNotificationsUseCaseInterface";
import { HttpStatus } from "../../../domain/entities/httpStatus";

export class DeleteAllNotificationController {
    private deleteAllNotificationUseCase: IdeleteAllNotificationUseCase
    constructor(deleteAllNotificationUseCase: IdeleteAllNotificationUseCase) {
        this.deleteAllNotificationUseCase = deleteAllNotificationUseCase
    }
    async handleDeleteAllNotification(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.query
            if (!userId) {
                res.status(HttpStatus.BAD_REQUEST).json({ error: 'No userId found' })
                return
            }
            await this.deleteAllNotificationUseCase.deleteAllNotifications(userId.toString())
            res.status(HttpStatus.OK).json({ message: "Notificaitons deleted" })
        } catch (error) {
            console.log('error while deleting all notification', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while deleting all notifcations',
                error: error instanceof Error ? error.message : 'error while deleting all notifcations'
            })
        }
    }
}