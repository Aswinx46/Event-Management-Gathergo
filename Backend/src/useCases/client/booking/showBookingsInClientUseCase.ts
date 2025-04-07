import { BookingsInClientEntity } from "../../../domain/entities/bookingListingInClientEntity";
import { IbookingRepository } from "../../../domain/interface/repositoryInterfaces/booking/bookingsRepositoryInterface";
import { IshowBookingsInClientUseCase } from "../../../domain/interface/useCaseInterfaces/client/booking/showBookingsUseCaseInterface";

export class ShowBookingsInClientUseCase implements IshowBookingsInClientUseCase {
    private bookingsDatabase: IbookingRepository
    constructor(bookingsDatabase: IbookingRepository) {
        this.bookingsDatabase = bookingsDatabase
    }
    async findBookings(clientId: string): Promise<BookingsInClientEntity[] | []> {
        const bookings = await this.bookingsDatabase.showBookingsInClient(clientId)
        return bookings
    }
}