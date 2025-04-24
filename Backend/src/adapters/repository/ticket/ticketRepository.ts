import { TicketAndEventDTO } from "../../../domain/entities/Ticket/ticketAndEventDTO";
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
    async findBookedTicketsOfClient(userId: string, pageNo: number): Promise<{ ticketAndEventDetails: TicketAndEventDTO[] | [], totalPages: number }> {
        const page = Math.max(pageNo, 1)
        const limit = 5
        const skip = (page - 1) * limit
        const ticketAndEvent = await ticketModel.find({ clientId: userId }).select('_id ticketId ticketCount phone email paymentStatus totalAmount ticketStatus qrCodeLink')
            .populate('eventId', '_id title description date startTime endTime status address pricePerTicket posterImage').skip(skip).limit(limit).sort({ createdAt: -1 }).lean()
        const totalPages = Math.ceil(await ticketModel.countDocuments() / limit)
        const ticketAndEventDetails: TicketAndEventDTO[] = ticketAndEvent.map(ticket => {
            const event = ticket.eventId as any; // TypeScript doesn't know it's populated

            return {
                _id: ticket._id,
                ticketId: ticket.ticketId,
                totalAmount: ticket.totalAmount,
                ticketCount: ticket.ticketCount,
                phone: ticket.phone,
                email: ticket.email,
                paymentStatus: ticket.paymentStatus,
                ticketStatus: ticket.ticketStatus,
                qrCodeLink: ticket.qrCodeLink,
                event: {
                    _id: event._id,
                    title: event.title,
                    description: event.description,
                    date: event.date,
                    startTime: event.startTime,
                    endTime: event.endTime,
                    status: event.status,
                    address: event.address,
                    pricePerTicket: event.pricePerTicket,
                    posterImage: event.posterImage,
                }
            };
        });
        return { ticketAndEventDetails: ticketAndEventDetails, totalPages }
    }
    async findTicketUsingTicketId(ticketId: string): Promise<TicketEntity | null> {
        return ticketModel.findOne({ ticketId }).select('-__v')
    }
    async changeUsedStatus(ticketId: string): Promise<TicketEntity | null> {
        return await ticketModel.findByIdAndUpdate(ticketId, { ticketStatus: 'used' })
    }
}