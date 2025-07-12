import { BookingListingEntityVendor } from "../../../domain/entities/vendor/BookingListingEntityVendor";
import { IbookingRepository } from "../../../domain/interface/repositoryInterfaces/booking/bookingsRepositoryInterface";
import { IshowBookingsInVendorUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/bookings/showBookingsInVendorUseCase";

export class ShowBookingsInVendorUseCase implements IshowBookingsInVendorUseCase {
    private bookingDatabase: IbookingRepository
    constructor(bookingDatabase: IbookingRepository) {
        this.bookingDatabase = bookingDatabase
    }
    async showBookingsInVendor(vendorId: string, pageNo: number): Promise<{ Bookings: BookingListingEntityVendor[] | [], totalPages: number }> {
        const { Bookings, totalPages } = await this.bookingDatabase.showBookingsInVendor(vendorId, pageNo)
        const bookingsMapped = Bookings.map((booking): BookingListingEntityVendor => ({
            _id: booking._id,
            date: booking.date,
            email: booking.email,
            paymentStatus: booking.paymentStatus,
            phone: booking.phone,
            service: booking.serviceId,
            client: booking.clientId,
            status: booking.status,
            vendorApproval: booking.vendorApproval,
            rejectionReason: booking.rejectionReason
        }));
        return { Bookings: bookingsMapped, totalPages }
    }
}