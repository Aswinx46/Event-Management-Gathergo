import { EventEntity } from "../../../../entities/event/eventEntity";
import { EventUpdateEntity } from "../../../../entities/event/eventUpdateEntity";

export interface IupdateEventUseCase {
    updateEvent(eventId: string, udpate: EventUpdateEntity): Promise<EventEntity>
}