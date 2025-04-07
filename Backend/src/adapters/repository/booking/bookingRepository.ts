import { BookingEntity } from "../../../domain/entities/bookingEntity";
import { IbookingRepository } from "../../../domain/interface/repositoryInterfaces/booking/bookingsRepositoryInterface";
import { bookingModel } from "../../../framerwork/database/models/bookingModel";

export class BookingRepository implements IbookingRepository {
    async createBooking(booking: BookingEntity): Promise<BookingEntity> {
        const createdBooking = await bookingModel.create(booking)
        if (!createdBooking) throw new Error('error while creating a booking')
        return createdBooking
    }
}