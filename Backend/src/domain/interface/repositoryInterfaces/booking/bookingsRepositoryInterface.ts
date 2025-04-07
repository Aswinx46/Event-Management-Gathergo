import { BookingEntity } from "../../../entities/bookingEntity";
import { BookingsInClientEntity } from "../../../entities/bookingListingInClientEntity";
import { ClientBookingDTO } from "../../../entities/clientBookingDTO";

export interface IbookingRepository {
    createBooking(booking: BookingEntity): Promise<BookingEntity>
    // approveBooking(bookingId: string, vendorId: string): Promise<BookingEntity | null>
    // showBookingsInVendor(vendorId: string): Promise<BookingEntity[] | [] | null>
    showBookingsInClient(clientId: string): Promise<BookingsInClientEntity[] | []>
}