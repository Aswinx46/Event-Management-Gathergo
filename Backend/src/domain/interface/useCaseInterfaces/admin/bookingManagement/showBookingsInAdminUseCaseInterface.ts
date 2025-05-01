import { PopulatedBookingForAdmin } from "../../../../entities/bookingDetailsInAdminDTO";

export interface IshowbookingsInAdminUseCase {
    showBookings(pageNo: number): Promise<{ bookings: PopulatedBookingForAdmin[] | [], totalPages: number }>
}