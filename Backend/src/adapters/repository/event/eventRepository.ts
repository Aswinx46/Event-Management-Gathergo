import { ObjectId, Types } from "mongoose";
import { EventEntity } from "../../../domain/entities/event/eventEntity";
import { EventUpdateEntity } from "../../../domain/entities/event/eventUpdateEntity";
import { IeventRepository } from "../../../domain/interface/repositoryInterfaces/event/eventRepositoryInterface";
import { eventModal } from "../../../framerwork/database/models/eventModel";



export class EventRepository implements IeventRepository {
    async createEvent(event: EventEntity): Promise<EventEntity> {
        return await eventModal.create(event)
    }
    async findAllEventsClient(pageNo: number): Promise<{ events: EventEntity[] | [], totalPages: number }> {
        const limit = 5
        const page = Math.max(pageNo, 1)
        const skip = (page - 1) * limit
        const events = await eventModal.find({ isActive: true }).select('-__v').skip(skip).limit(limit)
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
        return eventModal.findById(eventId).select('totalTicket ticketPurchased status')
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
    async findEventsBasedOnQuery(query: string): Promise<EventEntity[] | []> {
        const regex = new RegExp(query || '', 'i');
        return await eventModal.find({ title: { $regex: regex }, isActive: true }).select('_id title posterImage')
    }
    async findEventsNearToYou(latitude: number, longitude: number, pageNo: number, range: number): Promise<{ events: EventEntity[] | [], totalPages: number }> {
        const page = Math.max(pageNo, 1)
        const limit = 5
        const skip = (page - 1) * limit


        const locationQuery = {
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: range,
                },
            },
        };

        const events = await eventModal.find({ ...locationQuery, isActive: true }).skip(skip).limit(limit).sort({ createdAt: -1 })
        const totalPages = Math.ceil(await eventModal.countDocuments({ locationQuery, isActive: true }) / limit)
        return { events, totalPages }
    }
    async listingEventsInAdminSide(pageNo: number): Promise<{ events: EventEntity[] | [], totalPages: number }> {
        const limit = 4
        const page = Math.max(pageNo, 1)
        const skip = (page - 1) * limit
        const events = await eventModal.find().select('-__v').skip(skip).limit(limit).lean()
        const totalPages = Math.ceil(await eventModal.countDocuments() / limit)
        return { events, totalPages }
    }
    async findTotalEvents(vendorId: string, datePeriod: Date | null): Promise<number> {
        const query: Record<string, any> = { hostedBy: vendorId }
        if (datePeriod) {
            query.createdAt = { $gte: datePeriod }
        }
        return eventModal.countDocuments(query)
    }
    async findRecentEvents(vendorId: string): Promise<EventEntity[] | []> {
        return await eventModal.find({ hostedBy: vendorId })
    }
    async findTotalticketsSold(vendorId: string, datePeriod: Date | null): Promise<number> {
        const query: Record<string, any> = { hostedBy: new Types.ObjectId(vendorId) }
        if (datePeriod) {
            query.createdAt = { $gte: datePeriod }
        }
        const result = await eventModal.aggregate([
            { $match: query },
            {
                $group: {
                    _id: null,
                    totalTickets: { $sum: "$ticketPurchased" }
                }
            }
        ])
        return result[0]?.totalTickets || 0

    }
}