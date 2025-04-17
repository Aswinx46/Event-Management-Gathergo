import { EventEntity } from "../../../domain/entities/event/eventEntity";
import { IeventRepository } from "../../../domain/interface/repositoryInterfaces/event/eventRepositoryInterface";
import { eventModal } from "../../../framerwork/database/models/eventModel";

export class EventRepository implements IeventRepository {
    async createEvent(event: EventEntity): Promise<EventEntity> {
        return await eventModal.create(event)
    }
}