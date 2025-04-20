import { Request, Response } from "express";
import { IcreateTicketUseCase } from "../../../../domain/interface/useCaseInterfaces/client/ticket/ticketCreationUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class CreateTicketController {
    private createTicketUseCase: IcreateTicketUseCase
    constructor(createTicketUseCase: IcreateTicketUseCase) {
        this.createTicketUseCase = createTicketUseCase
    }
    async handleCreateUseCase(req: Request, res: Response): Promise<void> {
        try {
            const { ticket, totalCount, totalAmount, paymentIntentId, vendorId } = req.body
            const stripeClientId = await this.createTicketUseCase.createTicket(ticket, totalCount, totalAmount, paymentIntentId, vendorId)
            res.status(HttpStatus.CREATED).json({ message: "Ticket and payment created and initiated", stripeClientId })
        } catch (error) {
            console.log('error while creating ticket', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error while creating ticket",
                error: error instanceof Error ? error.message : "error while creating ticket"
            })
        }
    }
}