import { TicketEntity } from "../../../entities/Ticket/ticketEntity";

export interface IticketRepositoryInterface {
    createTicket(ticket: TicketEntity): Promise<TicketEntity>
}