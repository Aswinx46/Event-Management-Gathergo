import { TicketEntity } from "../../../../entities/Ticket/ticketEntity";

export interface IconfirmTicketAndPaymentUseCase {
    confirmTicketAndPayment(ticket:TicketEntity,paymentIntent:string,vendorId:string):Promise<TicketEntity>
}