import { TicketFromFrontend } from "../../../../entities/Ticket/ticketFromFrotendType";

export interface IcreateTicketUseCase {
    createTicket(ticket: TicketFromFrontend,totalCount:number,totalAmount:number): Promise<string>
}