import { TicketEntity } from "../../../../entities/Ticket/ticketEntity";
import { TicketAndVendorDTO } from "../../../../entities/TicketAndVendorDTO";

export interface ITicketCancellationUseCase {
    ticketCancellation(ticketId: string): Promise<TicketAndVendorDTO>
}