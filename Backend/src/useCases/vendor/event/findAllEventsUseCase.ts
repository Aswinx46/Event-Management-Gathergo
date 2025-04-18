import { EventEntity } from "../../../domain/entities/event/eventEntity";
import { IeventRepository } from "../../../domain/interface/repositoryInterfaces/event/eventRepositoryInterface";
import { IfindAllEventsVendorUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/event/findAllEventsUseCaseInterface";

export class FindAllEventsVendorUseCase implements IfindAllEventsVendorUseCase {
    private eventsDatabase: IeventRepository
    constructor(eventsDatabase: IeventRepository) {
        this.eventsDatabase = eventsDatabase
    }
    async findAllEvents(pageNo: number): Promise<{ events: EventEntity[] | []; totalPages: number; }> {
        const { events, totalPages } = await this.eventsDatabase.findAllEventsClient(pageNo)
        return { events, totalPages }
    }
}