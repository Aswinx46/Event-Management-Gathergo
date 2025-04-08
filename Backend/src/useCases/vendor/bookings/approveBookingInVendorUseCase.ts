import { BookingEntity } from "../../../domain/entities/bookingEntity";
import { IbookingRepository } from "../../../domain/interface/repositoryInterfaces/booking/bookingsRepositoryInterface";
import { IapproveBookingVendorUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/bookings/approveBookingInVendorUseCaseI";

export class ApproveBookingUseCase implements IapproveBookingVendorUseCase {
    private bookingDatabase: IbookingRepository
    constructor(bookingDatabase: IbookingRepository) {
        this.bookingDatabase = bookingDatabase
    }
    async approveBooking(bookingId: string,): Promise<boolean> {
        const approvedBooking = await this.bookingDatabase.approveBooking(bookingId)
        if (!approvedBooking) {
            throw new Error('There is no Booking with this ID')
        }
        return true

    }
}