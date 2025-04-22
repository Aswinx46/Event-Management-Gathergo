import { IbookingRepository } from "../../../domain/interface/repositoryInterfaces/booking/bookingsRepositoryInterface";
import { IupdateBookingAsCompleteUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/bookings/updateBookingAsCompleteUseCaseInterface";

export class UpdateBookingAsCompleteUseCase implements IupdateBookingAsCompleteUseCase {
    private bookingDatabase: IbookingRepository
    constructor(bookingDatabase: IbookingRepository) {
        this.bookingDatabase = bookingDatabase
    }
    async changeStatusOfBooking(bookingId: string, status: string): Promise<boolean> {
        const changeBookingStatus = await this.bookingDatabase.changeStatus(bookingId, status)
        if (!changeBookingStatus) throw new Error('No booking found in this Id')
        return true
    }
}