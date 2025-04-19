import { EventEntity } from "../../../domain/entities/event/eventEntity";
import { IeventRepository } from "../../../domain/interface/repositoryInterfaces/event/eventRepositoryInterface";
import { IfindEventByIdUseCase } from "../../../domain/interface/useCaseInterfaces/client/events/findEventByIdUseCaseInterface";

export class FindEventByIdUseCase implements IfindEventByIdUseCase {
    private eventDatabase: IeventRepository
    constructor(eventDatabase: IeventRepository) {
        this.eventDatabase = eventDatabase
    }
    async findEventById(eventId: string): Promise<EventEntity> {
        const event = await this.eventDatabase.findEventById(eventId)
        if (!event) throw new Error("No event found in this ID")
        return event
    }
}