import { EventEntity } from "../../../../entities/event/eventEntity";

export interface IfindEventsNearToUserUseCase {
    findEventsNearToUse(latitude: number, longitude: number,pageNo:number,range:number): Promise<{ events: EventEntity[] | [], totalPages: number }>
}