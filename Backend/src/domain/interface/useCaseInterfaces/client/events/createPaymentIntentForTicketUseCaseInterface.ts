import { TicketEntity } from "../../../../entities/Ticket/ticketEntity";

export interface IcreatePaymentIntentForTicketUseCaseInterface {
    createPaymentIntent(ticketData: TicketEntity): Promise<string>
}