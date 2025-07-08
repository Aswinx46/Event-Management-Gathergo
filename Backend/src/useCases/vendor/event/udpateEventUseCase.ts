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
        if (update.status === 'completed') {
            const today = new Date()
            const checkDate = update.schedule.every(slot => {
                const slotDate = new Date(slot.date);
                slotDate.setHours(0, 0, 0, 0);
                return slotDate <= today;
            })
            if (!checkDate) throw new Error("❌ Event has not occurred yet.")
        }
        if (update.status === 'onGoing') {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const hasToday = update.schedule.some(slot => {
                const slotDate = new Date(slot.date);
                slotDate.setHours(0, 0, 0, 0);
                return slotDate.getTime() === today.getTime();
            });

            if (!hasToday) {
                throw new Error("❌ No event is scheduled for today to mark as onGoing.");
            }
        }

        const updatedEvent = await this.eventDatabase.editEvent(eventId, update)
        if (!updatedEvent) throw new Error('No event found in this eventId')
        return updatedEvent
    }
}