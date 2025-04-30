import { BookingEntity } from "../../../../entities/bookingEntity";

export interface IbookingCancellationUseCase {
    cancelBooking(bookingId: string): Promise<BookingEntity>
}