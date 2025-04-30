import { Request, Response } from "express";
import { ITicketCancellationUseCase } from "../../../../domain/interface/useCaseInterfaces/client/ticket/ticketCancellationUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class TicketCancellationController {
    private ticketCancellationUseCase: ITicketCancellationUseCase
    constructor(ticketCancellationUseCase: ITicketCancellationUseCase) {
        this.ticketCancellationUseCase = ticketCancellationUseCase
    }
    async handleTicketCancellation(req: Request, res: Response): Promise<void> {
        try {
            const { ticketId } = req.body
            const cancelledTicket = await this.ticketCancellationUseCase.ticketCancellation(ticketId)
            res.status(HttpStatus.OK).json({ message: 'Ticket cancelled', cancelledTicket })
        } catch (error) {
            console.log('error while cancelling the ticket', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while cancelling the ticket',
                error: error instanceof Error ? error.message : 'error while cancelling the ticket'
            })
        }
    }
}