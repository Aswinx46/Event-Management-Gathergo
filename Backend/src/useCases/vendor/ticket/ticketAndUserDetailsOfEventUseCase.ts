import { TicketAndUserDTO } from "../../../domain/entities/Ticket/ticketAndUserDTO";
import { IticketRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/eventTicket/ticketRepositoryInterface";
import { IticketAndUserDetailsOfEventUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/ticket/ticketAndUserDetailsOfEventUseCaseInterface";

export class TicketAndUserDetailsOfEventUseCase implements IticketAndUserDetailsOfEventUseCase {
    private ticketDatabase: IticketRepositoryInterface
    constructor(ticketDatabase: IticketRepositoryInterface) {
        this.ticketDatabase = ticketDatabase
    }
    async findTicketAndUserDetailsOfEvent(eventId: string, vendorId: string, pageNo: number): Promise<{ticketAndEventDetails:TicketAndUserDTO[] | [] , totalPages:number}> {
        return await this.ticketDatabase.ticketAndUserDetails(eventId, vendorId, pageNo)
    }
}