import { BookingEntity } from "../../../../entities/bookingEntity";

export interface IconfirmBookingPaymentUseCase {
    confirmBookingPayment(booking: BookingEntity, paymentIntentId: string): Promise<boolean>
}