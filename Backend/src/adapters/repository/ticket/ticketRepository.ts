import { TicketEntity } from "../../../domain/entities/Ticket/ticketEntity";
import { IticketRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/eventTicket/ticketRepositoryInterface";
import { ticketModel } from "../../../framerwork/database/models/ticketModel";

export class TicketRepository implements IticketRepositoryInterface {
    async createTicket(ticket: TicketEntity): Promise<TicketEntity> {
        return await ticketModel.create(ticket)
    }
    async updatePaymentstatus(ticketId: string): Promise<TicketEntity | null> {
        return await ticketModel.findByIdAndUpdate(ticketId, { paymentStatus: 'successful' }, { new: true })
    }
}