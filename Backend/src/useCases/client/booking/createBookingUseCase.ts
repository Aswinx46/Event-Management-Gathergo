import { BookingEntity } from "../../../domain/entities/bookingEntity";
import { IbookingRepository } from "../../../domain/interface/repositoryInterfaces/booking/bookingsRepositoryInterface";
import { IcreateBookingUseCase } from "../../../domain/interface/useCaseInterfaces/client/booking/createBookingUseCaseInterface";

export class CreateBookingUseCase implements IcreateBookingUseCase {
    private bookingDatabase: IbookingRepository
    constructor(bookingDatabase: IbookingRepository) {
        this.bookingDatabase = bookingDatabase
    }
    async createBooking(booking: BookingEntity): Promise<BookingEntity> {
        return await this.bookingDatabase.createBooking(booking)
    }
}