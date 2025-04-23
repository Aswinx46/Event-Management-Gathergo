import { BookingPaymentEntity } from "../../../../entities/bookingPayment/bookingPaymentEntity";

export interface IinititateBookingPaymentUseCase {
    inititateBookingPayment(bookingId: string, paymentIntentId: string): Promise<{booking:BookingPaymentEntity , clientStripeId:string}>
}