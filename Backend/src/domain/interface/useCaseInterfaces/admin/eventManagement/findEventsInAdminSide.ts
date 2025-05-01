import { EventEntity } from "../../../../entities/event/eventEntity";

export interface IfindEventsInAdminSideUseCase {
    findEvents(pageNo: number): Promise<{ events: EventEntity[] | [], totalPages: number }>
}