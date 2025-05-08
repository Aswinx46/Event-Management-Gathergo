import { EventDashboardSummary } from "../../../../entities/event/eventDashboardDTO";

export interface IeventGraphUseCase {
    eventGraphDetails(): Promise<EventDashboardSummary>
}