import { EventEntity } from "../../../../entities/event/eventEntity";

export interface IfindAllEventsUseCase {
    findAllEvents(pageNo: number): Promise<{ events: EventEntity[] | [], totalPages: number }>
}