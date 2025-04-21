import { Request, Response } from "express";
import { IticketVerificationUseCase } from "../../../../domain/interface/useCaseInterfaces/vendor/event/ticketVerificationUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class TicketVerificationController {
    private ticketConfirmationUseCase: IticketVerificationUseCase
    constructor(ticketConfirmationUseCase: IticketVerificationUseCase) {
        this.ticketConfirmationUseCase = ticketConfirmationUseCase
    }
    async handleTicketConfirmation(req: Request, res: Response): Promise<void> {
        try {
            const { ticketId, eventId } = req.body
            const vendorId = (req as any).user.userId
            console.log('This is event id in controller',eventId)
            const ticketVerify = await this.ticketConfirmationUseCase.verifyTicket(ticketId, eventId, vendorId)
            res.status(HttpStatus.OK).json({ message: "Ticket verified" })
        } catch (error) {
            console.log('error while ticket confirming', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error while ticket confirming",
                error: error instanceof Error ? error.message : 'error while ticket confirming'
            })
        }
    }
}