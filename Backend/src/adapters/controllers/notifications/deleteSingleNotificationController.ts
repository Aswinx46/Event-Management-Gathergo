import { Request, Response } from "express";
import { IdeleteSingleNotificationUseCase } from "../../../domain/interface/useCaseInterfaces/notification/deleteSingleNotificationUseCaseInterface";
import { HttpStatus } from "../../../domain/entities/httpStatus";

export class DeleteSingleNotificationController {
    private deleteSingleNotificationUseCase: IdeleteSingleNotificationUseCase
    constructor(deleteSingleNotificationUseCase: IdeleteSingleNotificationUseCase) {
        this.deleteSingleNotificationUseCase = deleteSingleNotificationUseCase
    }
    async handleDeleteSingleNotification(req: Request, res: Response): Promise<void> {
        try {
            const { notficationId } = req.query
            if (!notficationId) {
                res.status(HttpStatus.BAD_REQUEST).json({ error: 'No notification id is found' })
                return
            }
            await this.deleteSingleNotificationUseCase.deleteSingleNotification(notficationId?.toString())
            res.status(HttpStatus.OK).json({ message: "Notification deleted" })
        } catch (error) {
            console.log('error while deleting single notification', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error while deleting single notfication",
                error: error instanceof Error ? error.message : 'error while deleting single notification'
            })
        }
    }
}