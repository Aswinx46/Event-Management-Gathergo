import { TicketEntity } from "../../../../entities/Ticket/ticketEntity";
import { TicketFromFrontend } from "../../../../entities/Ticket/ticketFromFrotendType";

export interface IcreateTicketUseCase {
    createTicket(ticket: TicketFromFrontend, totalCount: number, totalAmount: number, paymentIntentId: string, vendorId: string, ticketPurchasedDetails: Record<string, number>): Promise<{ createdTicket: TicketEntity[], stripeClientId: string }>
}