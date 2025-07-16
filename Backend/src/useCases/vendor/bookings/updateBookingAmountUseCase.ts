import { IbookingRepository } from "../../../domain/interface/repositoryInterfaces/booking/bookingsRepositoryInterface";
import { IupdateBookingAmountUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/bookings/updateBookingAmountUseCase";

export class UpdateBookingAmountUseCase implements IupdateBookingAmountUseCase {
    private bookingRepository: IbookingRepository
    constructor(bookingRepository: IbookingRepository) {
        this.bookingRepository = bookingRepository
    }
    async updateBookingAmount(bookingId: string, amount: number): Promise<boolean> {
        const booking = await this.bookingRepository.updateBookingAmount(bookingId, amount)
        if (!booking) throw new Error("No booking found in this ID")
        return true
    }
}