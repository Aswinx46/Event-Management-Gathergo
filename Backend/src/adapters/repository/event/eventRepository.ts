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
}