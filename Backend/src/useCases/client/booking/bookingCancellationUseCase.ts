import { BookingEntity } from "../../../domain/entities/bookingEntity";
import { IbookingRepository } from "../../../domain/interface/repositoryInterfaces/booking/bookingsRepositoryInterface";
import { IbookingCancellationUseCase } from "../../../domain/interface/useCaseInterfaces/client/booking/bookingCancellationUseCaseInterface";

export class BookingCancellationUseCase implements IbookingCancellationUseCase {
    private bookingDatabase: IbookingRepository
    constructor(bookingDatabase: IbookingRepository) {
        this.bookingDatabase = bookingDatabase
    }
    async cancelBooking(bookingId: string): Promise<BookingEntity> {
        const cancelledBooking = await this.bookingDatabase.cancelBooking(bookingId)
        if (!cancelledBooking) throw new Error('No booking found in this ID')
        return cancelledBooking
    }
}