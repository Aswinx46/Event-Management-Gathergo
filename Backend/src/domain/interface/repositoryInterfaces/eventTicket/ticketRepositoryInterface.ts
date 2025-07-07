import { ObjectId } from "mongoose";
import { TicketEntity } from "../../../entities/Ticket/ticketEntity";
import { TicketAndEventDTO } from "../../../entities/Ticket/ticketAndEventDTO";
import { TicketAndVendorDTO } from "../../../entities/TicketAndVendorDTO";
import { TicketAndUserDTO } from "../../../entities/Ticket/ticketAndUserDTO";

export interface IticketRepositoryInterface {
    createTicket(ticket: TicketEntity): Promise<TicketEntity>
    updatePaymentstatus(ticketId: string | ObjectId): Promise<TicketEntity | null>
    findBookedTicketsOfClient(userId: string, pageNo: number): Promise<{ ticketAndEventDetails: TicketAndEventDTO[] | [], totalPages: number }>
    findTicketUsingTicketId(ticketId: string): Promise<TicketEntity | null>
    changeUsedStatus(ticketId: string): Promise<TicketEntity | null>
    ticketCancellation(ticketId: string): Promise<TicketAndVendorDTO | null>
    ticketAndUserDetails(eventId: string, vendorId: string, pageNo: number): Promise<{ ticketAndEventDetails: TicketAndUserDTO[] | [], totalPages: number }>
    updateCheckInHistory(ticketId: string, date: Date): Promise<boolean>
    createManyTicket(tickets: TicketEntity[]): Promise<TicketEntity[]>
}