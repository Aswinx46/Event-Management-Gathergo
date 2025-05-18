import { BookingEntity } from "../../../domain/entities/bookingEntity";
import { IbookingRepository } from "../../../domain/interface/repositoryInterfaces/booking/bookingsRepositoryInterface";
import { IapproveBookingVendorUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/bookings/approveBookingInVendorUseCaseI";

export class ApproveBookingUseCase implements IapproveBookingVendorUseCase {
    private bookingDatabase: IbookingRepository
    constructor(bookingDatabase: IbookingRepository) {
        this.bookingDatabase = bookingDatabase
    }
    async approveBooking(bookingId: string,): Promise<boolean> {
        const booking = await this.bookingDatabase.findBookingByIdForDateChecking(bookingId)
        if (!booking) throw new Error("No booking Found in this Id")
        const conflict = await this.bookingDatabase.findBookingWithSameDate(bookingId, booking.vendorId.toString(), booking.date)
        if (conflict) throw new Error("Booking conflict: another booking already exists on this date")
        const approvedBooking = await this.bookingDatabase.approveBooking(bookingId)
        if (!approvedBooking) {
            throw new Error('There is no Booking with this ID')
        }
        return true

    }
}