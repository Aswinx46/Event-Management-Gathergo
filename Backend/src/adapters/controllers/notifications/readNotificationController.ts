import { Request, Response } from "express";
import { IreadNotificationUseCase } from "../../../domain/interface/useCaseInterfaces/notification/readNotificationUseCaseInterface";
import { HttpStatus } from "../../../domain/entities/httpStatus";

export class ReadNotificationController {
    private readNotificationUseCase: IreadNotificationUseCase
    constructor(readNotificationUseCase: IreadNotificationUseCase) {
        this.readNotificationUseCase = readNotificationUseCase
    }
    async handleReadNotification(req: Request, res: Response): Promise<void> {
        try {
            const { notificationId } = req.body
            await this.readNotificationUseCase.readNotification(notificationId)
            res.status(HttpStatus.OK).json({
                message: 'Notification readed'
            })
        } catch (error) {
            console.log('error while reading notification', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while reading notification',
                error: error instanceof Error ? error.message : 'error while reading notification'
            })
        }
    }
}