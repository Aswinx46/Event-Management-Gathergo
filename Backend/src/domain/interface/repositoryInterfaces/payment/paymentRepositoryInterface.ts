import { ObjectId } from "mongoose";
import { PaymentEntity } from "../../../entities/payment/paymentEntity";

export interface IpaymentRepository {
    createPayment(paymentDetails: PaymentEntity): Promise<PaymentEntity>
    updatePaymentStatusOfTicket(ticketId: string, status: string): Promise<PaymentEntity | null>
    updatePaymentStatusOfBooking(bookingId: string, status: string): Promise<PaymentEntity | null>
    findTransactionOfAUser(senderId: string | ObjectId, receiverId: string | ObjectId,bookingId:string|ObjectId): Promise<PaymentEntity | null>

}