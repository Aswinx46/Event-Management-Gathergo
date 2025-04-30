import { ObjectId } from "mongoose";
import { TicketEntity } from "../../../entities/Ticket/ticketEntity";
import { TicketAndEventDTO } from "../../../entities/Ticket/ticketAndEventDTO";
import { TicketAndVendorDTO } from "../../../entities/TicketAndVendorDTO";

export interface IticketRepositoryInterface {
    createTicket(ticket: TicketEntity): Promise<TicketEntity>
    updatePaymentstatus(ticketId: string | ObjectId): Promise<TicketEntity | null>
    findBookedTicketsOfClient(userId: string, pageNo: number): Promise<{ ticketAndEventDetails: TicketAndEventDTO[] | [], totalPages: number }>
    findTicketUsingTicketId(ticketId: string): Promise<TicketEntity | null>
    changeUsedStatus(ticketId: string): Promise<TicketEntity | null>
    ticketCancellation(ticketId: string): Promise<TicketAndVendorDTO | null>
}