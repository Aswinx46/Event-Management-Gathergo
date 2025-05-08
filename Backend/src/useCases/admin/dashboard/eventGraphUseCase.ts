import { EventDashboardSummary } from "../../../domain/entities/event/eventDashboardDTO";
import { IeventRepository } from "../../../domain/interface/repositoryInterfaces/event/eventRepositoryInterface";
import { IeventGraphUseCase } from "../../../domain/interface/useCaseInterfaces/admin/dashBoardDatas/eventGraphUseCaseInterface";

export class EventGraphUseCase implements IeventGraphUseCase {
    private eventDatabase: IeventRepository
    constructor(eventDatabase: IeventRepository) {
        this.eventDatabase = eventDatabase
    }
    async eventGraphDetails(): Promise<EventDashboardSummary> {
        return await this.eventDatabase.eventDetailsForAdminDashboard()
    }
}