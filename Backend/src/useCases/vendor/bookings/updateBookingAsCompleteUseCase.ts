import { IbookingRepository } from "../../../domain/interface/repositoryInterfaces/booking/bookingsRepositoryInterface";
import { IupdateBookingAsCompleteUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/bookings/updateBookingAsCompleteUseCaseInterface";

export class UpdateBookingAsCompleteUseCase implements IupdateBookingAsCompleteUseCase {
    private bookingDatabase: IbookingRepository
    constructor(bookingDatabase: IbookingRepository) {
        this.bookingDatabase = bookingDatabase
    }
    async changeStatusOfBooking(bookingId: string, status: string, amount?: number): Promise<boolean> {
        // const booking=await this.bookingDatabase.f
        const dates = await this.bookingDatabase.findBookingDatesOfABooking(bookingId)
        if (!dates) throw new Error('No booking found in this ID')
        const today = new Date()
        today.setHours(0, 0, 0, 0);

        const checkDate = dates.every((date) => {
            const d = new Date(date);
            d.setHours(0, 0, 0, 0);
            return d.getTime() <= today.getTime(); // allow today as valid
        });
        // if (!checkDate) throw new Error("The booking date has not arrived yet");
        if (amount) {
            const changeBookingStatusAndAmount = await this.bookingDatabase.updateBookingAmountAndStatus(bookingId, amount, status)
            if (!changeBookingStatusAndAmount) throw new Error('No booking found in this Id')
            return true
        }
        const changeBookingStatus = await this.bookingDatabase.changeStatus(bookingId, status)
        if (!changeBookingStatus) throw new Error('No booking found in this Id')
        return true
    }
}