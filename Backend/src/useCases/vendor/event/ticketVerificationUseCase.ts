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
        const changeStatusOfTicket = await this.ticketDatabase.changeUsedStatus(ticket._id as string)
        if (!changeStatusOfTicket) throw new Error('Error while changing the status of Ticket')
        return ticket
    }
}