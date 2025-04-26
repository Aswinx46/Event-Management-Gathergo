import { EventEntity } from "../../../../entities/event/eventEntity";

export interface IsearchEventsUseCase {
    searchEvents(query: string): Promise<EventEntity[] | []>
}