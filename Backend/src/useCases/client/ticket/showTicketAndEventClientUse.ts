import { TicketAndEventDTO } from "../../../domain/entities/Ticket/ticketAndEventDTO";
import { IticketRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/eventTicket/ticketRepositoryInterface";
import { IshowTicketAndEventClientUseCaseInterface } from "../../../domain/interface/useCaseInterfaces/client/ticket/showTicketAndEventClientUseCaseInterface";

export class ShowTicketAndEventClientUseCase implements IshowTicketAndEventClientUseCaseInterface {
    private ticketDatabase: IticketRepositoryInterface
    constructor(ticketDatabase: IticketRepositoryInterface) {
        this.ticketDatabase = ticketDatabase
    }
    async showTicketAndEvent(userId: string, pageNo: number): Promise<{ ticketAndEventDetails: TicketAndEventDTO[] | []; totalPages: number; }> {
        const { ticketAndEventDetails, totalPages } = await this.ticketDatabase.findBookedTicketsOfClient(userId, pageNo)
        return { ticketAndEventDetails, totalPages }
    }
}