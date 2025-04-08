import { BookingEntity } from "../../../entities/bookingEntity";
import { BookingsInClientEntity } from "../../../entities/bookingListingInClientEntity";
import { ClientBookingDTO } from "../../../entities/clientBookingDTO";
import { BookingListingEntityVendor } from "../../../entities/vendor/BookingListingEntityVendor";

export interface IbookingRepository {
    createBooking(booking: BookingEntity): Promise<BookingEntity>
    approveBooking(bookingId: string): Promise<BookingEntity | null>
    showBookingsInClient(clientId: string): Promise<BookingsInClientEntity[] | []>
    showBookingsInVendor(vendorId: string): Promise<BookingListingEntityVendor[] | []>
}