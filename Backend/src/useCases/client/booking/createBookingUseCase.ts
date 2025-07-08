import { BookingEntity } from "../../../domain/entities/bookingEntity";
import { IbookingRepository } from "../../../domain/interface/repositoryInterfaces/booking/bookingsRepositoryInterface";
import { IcreateBookingUseCase } from "../../../domain/interface/useCaseInterfaces/client/booking/createBookingUseCaseInterface";

export class CreateBookingUseCase implements IcreateBookingUseCase {
    private bookingDatabase: IbookingRepository
    constructor(bookingDatabase: IbookingRepository) {
        this.bookingDatabase = bookingDatabase
    }
    async createBooking(booking: BookingEntity): Promise<BookingEntity> {
        const existingBooking = await this.bookingDatabase.findBookingInSameDate(booking.clientId.toString(), booking.serviceId.toString(), booking.date)
        if (existingBooking) throw new Error('There is already a booking in same date')
        booking.date = booking.date.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
        return await this.bookingDatabase.createBooking(booking)
    }
}