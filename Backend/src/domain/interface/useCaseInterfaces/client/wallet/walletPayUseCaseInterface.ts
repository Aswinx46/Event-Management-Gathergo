import { TicketEntity } from "../../../../entities/Ticket/ticketEntity";

export interface IwalletPaymentUseCase {
    walletPay(userId: string, amount: number, paymentType: 'bookingPayment' | 'ticketBooking', ticket: TicketEntity, vendorId: string): Promise<boolean>
}