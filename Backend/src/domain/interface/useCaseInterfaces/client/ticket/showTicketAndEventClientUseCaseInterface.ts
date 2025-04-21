import { TicketAndEventDTO } from "../../../../entities/Ticket/ticketAndEventDTO";

export interface IshowTicketAndEventClientUseCaseInterface {
    showTicketAndEvent(userId: string, pageNo: number): Promise<{ ticketAndEventDetails: TicketAndEventDTO[] | [], totalPages: number }>
}