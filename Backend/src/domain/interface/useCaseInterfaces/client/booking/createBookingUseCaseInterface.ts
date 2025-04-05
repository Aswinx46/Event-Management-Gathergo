import { BookingEntity } from "../../../../entities/bookingEntity";

export interface IcreateBookingUseCase {
    createBooking(booking: BookingEntity): Promise<BookingEntity>
}