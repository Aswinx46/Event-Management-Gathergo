import { EventEntity } from "../../../domain/entities/event/eventEntity";
import { IeventRepository } from "../../../domain/interface/repositoryInterfaces/event/eventRepositoryInterface";
import { IfindEventsBasedOnCategoryUseCase } from "../../../domain/interface/useCaseInterfaces/client/events/findEventsBasedOnCategory";

export class FindEventsBasedOnCategoryUseCase implements IfindEventsBasedOnCategoryUseCase {
    private eventDatabase: IeventRepository
    constructor(eventDatabase: IeventRepository) {
        this.eventDatabase = eventDatabase
    }
    async findEventsbasedOnCategory(category: string, pageNo: number, sortBy: string): Promise<{ events: EventEntity[] | [], totalPages: number }> {
        const { events, totalPages } = await this.eventDatabase.findEventsBaseOnCategory(category, pageNo, sortBy)
        return { events, totalPages }
    }
}