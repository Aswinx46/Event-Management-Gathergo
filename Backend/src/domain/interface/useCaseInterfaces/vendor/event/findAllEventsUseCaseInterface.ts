import { EventEntity } from "../../../../entities/event/eventEntity";

export interface IfindAllEventsVendorUseCase {
    findAllEvents(vendorId: string, pageNo: number): Promise<{ events: EventEntity[] | [], totalPages: number }>
}