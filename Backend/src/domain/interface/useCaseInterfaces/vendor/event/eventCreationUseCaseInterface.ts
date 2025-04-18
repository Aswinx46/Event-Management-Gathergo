import { EventEntity } from "../../../../entities/event/eventEntity";

export interface IeventCreationUseCase {
    createEvent(event: EventEntity, vendorId: string): Promise<EventEntity>
}