import { EventEntity } from "../../../entities/event/eventEntity";
import { EventUpdateEntity } from "../../../entities/event/eventUpdateEntity";

export interface IeventRepository {
    createEvent(event: EventEntity): Promise<EventEntity>
    findAllEventsClient(pageNo: number): Promise<{ events: EventEntity[] | [], totalPages: number }>
    findEventsOfAVendor(vendorId: string, pageNo: number): Promise<{ events: EventEntity[] | [], totalPages: number }>
    editEvent(eventId: string, update: EventUpdateEntity): Promise<EventEntity | null>
}