import { TicketEntity } from "../../../../entities/Ticket/ticketEntity";

export interface IconfirmTicketAndPaymentUseCase {
    confirmTicketAndPayment(tickets: TicketEntity[], paymentIntent: string, vendorId: string): Promise<boolean>
}