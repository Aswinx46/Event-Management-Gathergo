import { TicketEntity } from "../../../domain/entities/Ticket/ticketEntity";
import { IeventRepository } from "../../../domain/interface/repositoryInterfaces/event/eventRepositoryInterface";
import { IticketRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/eventTicket/ticketRepositoryInterface";
import { IticketVerificationUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/event/ticketVerificationUseCaseInterface";

export class TicketVerificationUseCase implements IticketVerificationUseCase {
    private ticketDatabase: IticketRepositoryInterface
    private eventDatabase: IeventRepository
    constructor(ticketDatabase: IticketRepositoryInterface, eventDatabase: IeventRepository) {
        this.ticketDatabase = ticketDatabase
        this.eventDatabase = eventDatabase
    }
    async verifyTicket(ticketId: string, eventId: string, vendorId: string): Promise<TicketEntity> {
        const ticket = await this.ticketDatabase.findTicketUsingTicketId(ticketId)
        if (!ticket) throw new Error('No ticket found in this ID')
        if (ticket.ticketStatus == 'used') throw new Error('This ticket is already used')
        if (ticket.ticketStatus == 'refunded') throw new Error('This ticket is already cancelled')
        if (ticket.eventId.toString() !== eventId) throw new Error('This is not the ticket of this event')
        const event = await this.eventDatabase.findEventByIdForTicketVerification(ticket.eventId as string)
        if (!event) throw new Error('No event found in this ID')
        if (event.hostedBy.toString() !== vendorId) throw new Error("This event is not hosted by you")

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dateChecking = event.schedule.some((item) => {
            const eventDate = new Date(item.date);
            eventDate.setHours(0, 0, 0, 0);
            return eventDate.getTime() === today.getTime();
        });

        if (!dateChecking) {
            throw new Error('❌ Ticket can only be used on the event date.');
        }
        const checkInHistory = ticket.checkInHistory || [];
        const hasCheckedInToday = checkInHistory.some(dateStr => {
            const checkInDate = new Date(dateStr);
            checkInDate.setHours(0, 0, 0, 0);
            return checkInDate.getTime() === today.getTime();
        });

        if (hasCheckedInToday) {
            throw new Error('❌ Ticket already used today.');
        }
      
        const updateCheckInHistory = await this.ticketDatabase.updateCheckInHistory(ticket._id?.toString()!, new Date(today))
        if (!updateCheckInHistory) throw new Error('Error while updating check in histiory for the ticket')
     
        return ticket
    }
}