import { EventEntity } from "../../../entities/event/eventEntity";

export interface IeventRepository {
    createEvent(event: EventEntity): Promise<EventEntity>
    findAllEventsClient(pageNo: number): Promise<{ events: EventEntity[] | [], totalPages: number }>
}