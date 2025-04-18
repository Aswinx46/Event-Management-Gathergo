import { EventEntity } from "../../../../entities/event/eventEntity";

export interface IfindAllEventsVendorUseCase {
    findAllEvents(pageNo: number): Promise<{ events: EventEntity[] | [], totalPages: number }>
}