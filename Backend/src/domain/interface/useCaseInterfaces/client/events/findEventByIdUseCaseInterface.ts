import { EventEntity } from "../../../../entities/event/eventEntity";

export interface IfindEventByIdUseCase {
    findEventById(eventId: string): Promise<EventEntity>
}