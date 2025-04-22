import { TicketEntity } from "../../../../entities/Ticket/ticketEntity";

export interface IticketVerificationUseCase {
    verifyTicket(ticketId: string, eventId: string, vendorId: string): Promise<TicketEntity>
}