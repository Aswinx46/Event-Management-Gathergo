import { ObjectId } from "mongoose";
import { TicketEntity } from "../../../entities/Ticket/ticketEntity";

export interface IticketRepositoryInterface {
    createTicket(ticket: TicketEntity): Promise<TicketEntity>
    updatePaymentstatus(ticketId:string|ObjectId):Promise<TicketEntity | null>
}