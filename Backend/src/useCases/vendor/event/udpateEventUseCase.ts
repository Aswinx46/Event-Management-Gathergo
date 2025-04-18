import { EventEntity } from "../../../domain/entities/event/eventEntity";
import { EventUpdateEntity } from "../../../domain/entities/event/eventUpdateEntity";
import { IeventRepository } from "../../../domain/interface/repositoryInterfaces/event/eventRepositoryInterface";
import { IupdateEventUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/event/updateEventUseCaseInterface";

export class UpdateEventUseCase implements IupdateEventUseCase {
    private eventDatabase: IeventRepository
    constructor(eventDatabase: IeventRepository) {
        this.eventDatabase = eventDatabase
    }
    async updateEvent(eventId: string, update: EventUpdateEntity): Promise<EventEntity> {
        const updatedEvent = await this.eventDatabase.editEvent(eventId, update)
        if (!updatedEvent) throw new Error('No event found in this eventId')
        return updatedEvent
    }
}