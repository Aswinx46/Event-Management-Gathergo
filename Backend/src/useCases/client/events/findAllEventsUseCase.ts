import { EventEntity } from "../../../domain/entities/event/eventEntity";
import { IeventRepository } from "../../../domain/interface/repositoryInterfaces/event/eventRepositoryInterface";
import { IfindAllEventsUseCase } from "../../../domain/interface/useCaseInterfaces/client/events/findAllEventsUseCaseInterface";

export class FindAllEventsUseCase implements IfindAllEventsUseCase {
    private eventDatabase: IeventRepository
    constructor(eventDatabase: IeventRepository) {
        this.eventDatabase = eventDatabase
    }
    async findAllEvents(pageNo: number): Promise<{ events: EventEntity[] | [], totalPages: number }> {
        const { events, totalPages } = await this.eventDatabase.findAllEventsClient(pageNo)
        if (!events) throw new Error('Error while finding all events')
        return { events, totalPages }
    }
}