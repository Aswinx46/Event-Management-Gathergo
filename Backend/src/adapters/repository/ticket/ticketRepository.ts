import { Types } from "mongoose";
import { TicketAndEventDTO } from "../../../domain/entities/Ticket/ticketAndEventDTO";
import { TicketAndUserDTO } from "../../../domain/entities/Ticket/ticketAndUserDTO";
import { TicketEntity } from "../../../domain/entities/Ticket/ticketEntity";
import { TicketAndVendorDTO } from "../../../domain/entities/TicketAndVendorDTO";
import { IticketRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/eventTicket/ticketRepositoryInterface";
import { ticketModel } from "../../../framerwork/database/models/ticketModel";

export class TicketRepository implements IticketRepositoryInterface {
    async createTicket(ticket: TicketEntity): Promise<TicketEntity> {
        return await ticketModel.create(ticket)
    }
    async updatePaymentstatus(ticketId: string): Promise<TicketEntity | null> {
        return await ticketModel.findByIdAndUpdate(ticketId, { paymentStatus: 'successful' }, { new: true })
    }
    async findBookedTicketsOfClient(userId: string, pageNo: number): Promise<{ ticketAndEventDetails: any[] | [], totalPages: number }> {
        const page = Math.max(pageNo, 1)
        const limit = 4
        const skip = (page - 1) * limit
        const ticketAndEvent = await ticketModel.find({ clientId: userId }).select('_id ticketId ticketCount phone email paymentStatus totalAmount ticketStatus qrCodeLink amount ticketType')
            .populate('eventId', '_id title description status address pricePerTicket posterImage schedule').skip(skip).limit(limit).sort({ createdAt: -1 }).lean()
        const totalPages = Math.ceil(await ticketModel.countDocuments() / limit)
        
        return { ticketAndEventDetails: ticketAndEvent, totalPages }
    }
    async findTicketUsingTicketId(ticketId: string): Promise<TicketEntity | null> {
        return ticketModel.findOne({ ticketId }).select('-__v')
    }
    async changeUsedStatus(ticketId: string): Promise<TicketEntity | null> {
        return await ticketModel.findByIdAndUpdate(ticketId, { ticketStatus: 'used' })
    }
    async ticketCancellation(ticketId: string): Promise<any | null> {
        const ticket = await ticketModel.findByIdAndUpdate(ticketId, { ticketStatus: 'refunded' }, { new: true }).populate('eventId', 'hostedBy').lean()
        if (!ticket) return null;
        return ticket
    }
    async ticketAndUserDetails(eventId: string, vendorId: string, pageNo: number): Promise<{ ticketAndEventDetails: TicketAndUserDTO[] | [], totalPages: number }> {
        const page = Math.max(pageNo, 1)
        const limit = 6
        const skip = (page - 1) * limit
        const matchStage: any = {
            'event._id': new Types.ObjectId(eventId),
            'event.hostedBy': new Types.ObjectId(vendorId)
        };
        const tickets = await ticketModel.aggregate([
            {
                $lookup: {
                    from: 'events',
                    localField: 'eventId',
                    foreignField: '_id',
                    as: 'event'
                }
            },
            { $unwind: '$event' },
            {
                $match: {
                    ...matchStage
                }
            },
            {
                $lookup: {
                    from: 'clients',
                    localField: 'clientId',
                    foreignField: '_id',
                    as: 'client'
                }
            },
            { $unwind: '$client' },
            {
                $addFields: {
                    eventId: '$event',
                    clientId: '$client'
                }
            },
            {
                $project: {
                    event: 0,
                    client: 0,
                    __v: 0,
                    'eventId.__v': 0,
                    'clientId.__v': 0
                }
            },
            { $skip: skip },
            { $limit: limit }
        ]);

        const countResult = await ticketModel.aggregate([
            {
                $lookup: {
                    from: 'events',
                    localField: 'eventId',
                    foreignField: '_id',
                    as: 'event'
                }
            },
            { $unwind: '$event' },
            {
                $match: {
                    'event._id': new Types.ObjectId(eventId),
                    'event.hostedBy': new Types.ObjectId(vendorId)
                }
            },
            { $count: 'total' }
        ]);

        const totalCount = countResult[0]?.total || 0;
        const totalPages = Math.ceil(totalCount / limit);

        return { ticketAndEventDetails: tickets, totalPages }
    }
    async updateCheckInHistory(ticketId: string, date: Date): Promise<boolean> {
        const result = await ticketModel.updateOne(
            { _id: ticketId },
            { $addToSet: { checkInHistory: date } }
        );

        return result.modifiedCount > 0;
    }
    async createManyTicket(tickets: TicketEntity[]): Promise<TicketEntity[]> {
        return await ticketModel.insertMany(tickets)
    }
    async findPersonsWhoBuyedTicketForAnEvent(eventId: string): Promise<TicketEntity[] | []> {
        return await ticketModel.find({ eventId, paymentStatus: 'successful' })
    }
}