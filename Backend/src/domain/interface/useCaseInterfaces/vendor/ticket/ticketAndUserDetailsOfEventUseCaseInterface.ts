import { TicketAndUserDTO } from "../../../../entities/Ticket/ticketAndUserDTO";

export interface IticketAndUserDetailsOfEventUseCase {
    findTicketAndUserDetailsOfEvent(eventId: string, vendorId: string,pageNo:number): Promise<{ticketAndEventDetails:TicketAndUserDTO[] | [] , totalPages:number}>
}