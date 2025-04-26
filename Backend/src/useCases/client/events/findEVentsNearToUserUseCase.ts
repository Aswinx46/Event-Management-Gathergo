import { EventEntity } from "../../../domain/entities/event/eventEntity";
import { IeventRepository } from "../../../domain/interface/repositoryInterfaces/event/eventRepositoryInterface";
import { IfindEventsNearToUserUseCase } from "../../../domain/interface/useCaseInterfaces/client/events/findEventsNearToUserUseCaseInterface";

export class FindEventsNearToUserUseCase implements IfindEventsNearToUserUseCase {
    private eventDatabase: IeventRepository
    constructor(eventDatabase: IeventRepository) {
        this.eventDatabase = eventDatabase
    }
    async findEventsNearToUse(latitude: number, longitude: number, pageNo: number,range:number): Promise<{ events: EventEntity[] | [], totalPages: number }> {
        if (!latitude || !longitude) {
            throw new Error('Latitude or longitude is missing')
        }
        const { events, totalPages } = await this.eventDatabase.findEventsNearToYou(latitude, longitude, pageNo,range)
        return { events, totalPages }
    }
}