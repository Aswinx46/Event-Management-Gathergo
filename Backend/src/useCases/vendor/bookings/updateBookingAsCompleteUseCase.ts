import { IbookingRepository } from "../../../domain/interface/repositoryInterfaces/booking/bookingsRepositoryInterface";
import { IupdateBookingAsCompleteUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/bookings/updateBookingAsCompleteUseCaseInterface";

export class UpdateBookingAsCompleteUseCase implements IupdateBookingAsCompleteUseCase {
    private bookingDatabase: IbookingRepository
    constructor(bookingDatabase: IbookingRepository) {
        this.bookingDatabase = bookingDatabase
    }
    async changeStatusOfBooking(bookingId: string, status: string, servicePrice: number, amount?: number, extraHour?: number): Promise<boolean> {
        console.log(`This is the bookingId ${bookingId}
                    this is the status ${status}
                    this is the servicePrice ${servicePrice}
                    this is the amount ${amount}
                    this is the extrahour ${extraHour}`)
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
            const totalAmount = (dates?.length * servicePrice) + (amount - servicePrice)
            const changeBookingStatusAndAmount = await this.bookingDatabase.updateBookingAmountAndStatus(bookingId, totalAmount, status, extraHour)
            if (!changeBookingStatusAndAmount) throw new Error('No booking found in this Id')
            return true
        }
        const changeBookingStatus = await this.bookingDatabase.changeStatus(bookingId, status)
        if (!changeBookingStatus) throw new Error('No booking found in this Id')
        return true
    }
}