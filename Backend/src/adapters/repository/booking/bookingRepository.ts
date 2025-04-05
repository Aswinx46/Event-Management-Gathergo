import { BookingEntity } from "../../../domain/entities/bookingEntity";
import { IbookingRepository } from "../../../domain/interface/repositoryInterfaces/booking/bookingsRepositoryInterface";
import { bookingModel } from "../../../framerwork/database/models/bookingModel";

export class BookingRepository implements IbookingRepository {
    async createBooking(booking: BookingEntity): Promise<BookingEntity> {
        return await bookingModel.create(booking)
    }
}