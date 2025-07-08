import { EventEntity } from "../../../domain/entities/event/eventEntity";
import { IeventRepository } from "../../../domain/interface/repositoryInterfaces/event/eventRepositoryInterface";
import { IeventCreationUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/event/eventCreationUseCaseInterface";

export class EventCreationUseCase implements IeventCreationUseCase {
    private eventDatabase: IeventRepository
    constructor(eventDatabase: IeventRepository) {
        this.eventDatabase = eventDatabase
    }
    async createEvent(event: EventEntity, vendorId: string): Promise<EventEntity> {
        event.hostedBy = vendorId
        event.schedule = event.schedule.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        const createEvent = await this.eventDatabase.createEvent(event)
        if (!createEvent) throw new Error('Error while creating event')
        return createEvent
    }
}