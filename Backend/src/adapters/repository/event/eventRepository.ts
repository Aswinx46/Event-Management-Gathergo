import { ObjectId } from "mongoose";
import { EventEntity } from "../../../domain/entities/event/eventEntity";
import { EventUpdateEntity } from "../../../domain/entities/event/eventUpdateEntity";
import { IeventRepository } from "../../../domain/interface/repositoryInterfaces/event/eventRepositoryInterface";
import { eventModal } from "../../../framerwork/database/models/eventModel";



export class EventRepository implements IeventRepository {
    async createEvent(event: EventEntity): Promise<EventEntity> {
        return await eventModal.create(event)
    }
    async findAllEventsClient(pageNo: number): Promise<{ events: EventEntity[] | [], totalPages: number }> {
        const limit = 2
        const page = Math.max(pageNo, 1)
        const skip = (page - 1) * limit
        const events = await eventModal.find().select('-__v').skip(skip).limit(limit)
        const totalPages = Math.ceil(await eventModal.countDocuments() / limit)
        return { events, totalPages }
    }
    async findEventsOfAVendor(vendorId: string, pageNo: number): Promise<{ events: EventEntity[] | [], totalPages: number }> {
        const limit = 5
        const page = Math.max(pageNo, 1)
        const skip = (page - 1) * limit
        const events = await eventModal.find({ hostedBy: vendorId }).select('-__v').skip(skip).limit(limit)
        const totalPages = Math.ceil(await eventModal.countDocuments({ hostedBy: vendorId }) / limit)
        return { events, totalPages }
    }
    async editEvent(eventId: string, update: EventUpdateEntity): Promise<EventEntity | null> {
        return await eventModal.findByIdAndUpdate(eventId, update, { new: true }).select('-__v')

    }
    async findEventById(eventId: string): Promise<EventEntity | null> {
        return eventModal.findById(eventId).select('-__v')
    }
    async updateTicketPurchaseCount(eventId: string | ObjectId, newCount: number): Promise<EventEntity | null> {
        return eventModal.findByIdAndUpdate(eventId, { ticketPurchased: newCount })
    }
    async findTotalTicketCountAndticketPurchased(eventId: string | ObjectId): Promise<{ totalTicket: number; ticketPurchased: number; }> {
        const eventDetails = await eventModal.findById(eventId).select('ticketPurchased totalTicket')
        if (!eventDetails) throw new Error('No event found in this ID')
        return { totalTicket: eventDetails?.totalTicket, ticketPurchased: eventDetails?.ticketPurchased }
    }
    async findEventByIdForTicketVerification(eventId: string): Promise<EventEntity | null> {
        return eventModal.findById(eventId).select('hostedBy')
    }
    async findTotalTicketAndBookedTicket(eventId: string): Promise<EventEntity | null> {
        return eventModal.findById(eventId).select('totalTicket ticketPurchased')
    }
    async findEventsBaseOnCategory(category: string, pageNo: number, sortBy: string): Promise<{ events: EventEntity[] | []; totalPages: number; }> {
        const sortOptions: Record<string, any> = {
            "a-z": { title: 1 },
            "z-a": { title: -1 },
            "price-low-high": { pricePerTicket: 1 },
            "price-high-low": { pricePerTicket: -1 },
            "newest": { createdAt: -1 },
            "oldest": { createdAt: 1 }
        }
        const sort = sortOptions[sortBy] || { createdAt: -1 }
        const limit = 5
        const page = Math.max(pageNo, 1)
        const skip = (page - 1) * limit
        const events = await eventModal.find({ category }).select('-__v').skip(skip).limit(limit).sort(sort)
        const totalPages = Math.ceil(await eventModal.countDocuments({ category }) / limit)
        return { events, totalPages }
    }

}