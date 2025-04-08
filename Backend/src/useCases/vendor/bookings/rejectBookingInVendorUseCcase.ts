import { IbookingRepository } from "../../../domain/interface/repositoryInterfaces/booking/bookingsRepositoryInterface";
import { IrejectBookingVendorUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/bookings/rejectBookingInVendorUseCaseI";

export class RejectBookingInVendorUseCase implements IrejectBookingVendorUseCase {
    private bookingDatabase: IbookingRepository
    constructor(bookingDatabase: IbookingRepository) {
        this.bookingDatabase = bookingDatabase
    }
    async rejectBooking(bookingId: string, rejectionReason: string): Promise<boolean> {
        const rejectedBooking = await this.bookingDatabase.rejectBooking(bookingId,rejectionReason)
        if (!rejectedBooking) throw new Error('There is no booking in this Booking Id')
        return true
    }
}