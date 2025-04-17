import { model, ObjectId } from "mongoose";
import { TicketEntity } from "../../../domain/entities/Ticket/ticketEntity";
import { ticketSchema } from "../schema/ticketSchema";

export interface IticketMode extends Omit<TicketEntity, '_id'>, Document {
    _id: ObjectId
}

export const ticketModel = model<TicketEntity>('ticket', ticketSchema)