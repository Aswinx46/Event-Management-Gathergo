import { TicketAndVendorDTO } from "../../../../entities/TicketAndVendorDTO";

export interface ITicketCancellationUseCase {
    ticketCancellation(ticketId: string): Promise<TicketAndVendorDTO>
}