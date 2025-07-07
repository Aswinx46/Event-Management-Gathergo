import { Request, Response } from "express";
import { IshowTicketAndEventClientUseCaseInterface } from "../../../../../domain/interface/useCaseInterfaces/client/ticket/showTicketAndEventClientUseCaseInterface";
import { HttpStatus } from "../../../../../domain/entities/httpStatus";

export class TicketAndEventDetailsClientController {
    private ticketAndEventDetailsUseCase: IshowTicketAndEventClientUseCaseInterface
    constructor(ticketAndEventDetailsUseCase: IshowTicketAndEventClientUseCaseInterface) {
        this.ticketAndEventDetailsUseCase = ticketAndEventDetailsUseCase
    }
    async handleFetchTicketAndEventDetails(req: Request, res: Response): Promise<void> {
        try {
            const { userId, pageNo } = req.params
            const page = parseInt(pageNo, 10) || 1
            const { ticketAndEventDetails, totalPages } = await this.ticketAndEventDetailsUseCase.showTicketAndEvent(userId, page)
            res.status(HttpStatus.OK).json({ message: "Ticket details fetched", ticketAndEventDetails, totalPages })
        } catch (error) {
            console.log('error while fetching ticketDetails with event details', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while fetching ticketDetails with event details',
                error: error instanceof Error ? error.message : 'error while fetching ticketDetails with event details'
            })
        }
    }
}