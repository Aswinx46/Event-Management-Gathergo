import { ObjectId } from "mongoose";
import { TicketEntity } from "../../../entities/Ticket/ticketEntity";
import { TicketAndEventDTO } from "../../../entities/Ticket/ticketAndEventDTO";

export interface IticketRepositoryInterface {
    createTicket(ticket: TicketEntity): Promise<TicketEntity>
    updatePaymentstatus(ticketId: string | ObjectId): Promise<TicketEntity | null>
    findBookedTicketsOfClient(userId: string, pageNo: number): Promise<{ ticketAndEventDetails: TicketAndEventDTO[] | [], totalPages: number }>
}