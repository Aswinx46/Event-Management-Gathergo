import { EventEntity } from "../../../domain/entities/event/eventEntity";
import { IeventRepository } from "../../../domain/interface/repositoryInterfaces/event/eventRepositoryInterface";
import { IsearchEventsUseCase } from "../../../domain/interface/useCaseInterfaces/client/events/searchEventsUseCaseInterface";

export class searchEventsUseCase implements IsearchEventsUseCase {
    private eventDatabase: IeventRepository
    constructor(eventDatabase: IeventRepository) {
        this.eventDatabase = eventDatabase
    }
    async searchEvents(query: string): Promise<EventEntity[] | []> {
        if (!query) throw new Error('No query available')
        return await this.eventDatabase.findEventsBasedOnQuery(query)
    }
}