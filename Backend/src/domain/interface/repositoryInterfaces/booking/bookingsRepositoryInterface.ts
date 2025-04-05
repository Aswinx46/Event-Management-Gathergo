import { BookingEntity } from "../../../entities/bookingEntity";

export interface IbookingRepository {
    createBooking(booking: BookingEntity): Promise<BookingEntity>
    // approveBooking(bookingId: string, vendorId: string): Promise<BookingEntity | null>
    // showBookingsInVendor(vendorId: string): Promise<BookingEntity[] | [] | null>
}