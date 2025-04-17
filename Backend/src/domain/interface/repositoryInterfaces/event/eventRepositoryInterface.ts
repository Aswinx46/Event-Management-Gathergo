import { EventEntity } from "../../../entities/event/eventEntity";

export interface IeventRepository {
    createEvent(event: EventEntity): Promise<EventEntity>
}