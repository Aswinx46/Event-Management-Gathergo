import { EventEntity } from "../../../../entities/event/eventEntity";

export interface IfindEventsBasedOnCategoryUseCase {
    findEventsbasedOnCategory(category: string, pageNo: number, sortBy: string):Promise<{ events: EventEntity[] | [], totalPages: number }>
}