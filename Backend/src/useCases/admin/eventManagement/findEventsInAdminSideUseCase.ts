import { EventEntity } from "../../../domain/entities/event/eventEntity";
import { IeventRepository } from "../../../domain/interface/repositoryInterfaces/event/eventRepositoryInterface";
import { IfindEventsInAdminSideUseCase } from "../../../domain/interface/useCaseInterfaces/admin/eventManagement/findEventsInAdminSide";

export class FindEventsInAdminSideUseCase implements IfindEventsInAdminSideUseCase {
    private eventDatabase: IeventRepository
    constructor(eventDatabase: IeventRepository) {
        this.eventDatabase = eventDatabase
    }
    async findEvents(pageNo: number): Promise<{ events: EventEntity[] | []; totalPages: number; }> {
        return await this.eventDatabase.listingEventsInAdminSide(pageNo)
    }
}