import { PopulatedBookingForAdmin } from "../../../domain/entities/bookingDetailsInAdminDTO";
import { IbookingRepository } from "../../../domain/interface/repositoryInterfaces/booking/bookingsRepositoryInterface";
import { IshowbookingsInAdminUseCase } from "../../../domain/interface/useCaseInterfaces/admin/bookingManagement/showBookingsInAdminUseCaseInterface";

export class ShowBookingsInAdminUseCase implements IshowbookingsInAdminUseCase {
    private bookingDatabase: IbookingRepository
    constructor(bookingDatabase: IbookingRepository) {
        this.bookingDatabase = bookingDatabase
    }
    async showBookings(pageNo: number): Promise<{ bookings: PopulatedBookingForAdmin[] | []; totalPages: number; }> {
        return await this.bookingDatabase.showAllBookingsInAdmin(pageNo)
    }
}