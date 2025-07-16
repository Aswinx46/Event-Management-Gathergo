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
   
        const ticketDetailsMapped: TicketAndEventDTO[] = ticketAndEventDetails.map(ticket => {
            const event = ticket.eventId as any; 
            return {
                _id: ticket._id,
                ticketId: ticket.ticketId,
                amount: ticket.amount,
                phone: ticket.phone,
                email: ticket.email,
                paymentStatus: ticket.paymentStatus,
                ticketStatus: ticket.ticketStatus,
                qrCodeLink: ticket.qrCodeLink,
                ticketType: ticket.ticketType,
                event: {
                    _id: event._id,
                    title: event.title,
                    description: event.description,
                    schedule: event.schedule,
                    status: event.status,
                    address: event.address,
                    pricePerTicket: event.pricePerTicket,
                    posterImage: event.posterImage,
                }
            };
        });
        return { ticketAndEventDetails:ticketDetailsMapped, totalPages }
    }
}