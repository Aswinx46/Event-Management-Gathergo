import { TicketFromFrontend } from "../../../../entities/Ticket/ticketFromFrotendType";

export interface IcreateTicketUseCase {
    createTicket(ticket: TicketFromFrontend, totalCount: number, totalAmount: number, paymentIntentId: string, vendorId: string): Promise<string>
}