import { BookingListingEntityVendor } from "../../../domain/entities/vendor/BookingListingEntityVendor";
import { IbookingRepository } from "../../../domain/interface/repositoryInterfaces/booking/bookingsRepositoryInterface";
import { IshowBookingsInVendorUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/bookings/showBookingsInVendorUseCase";

export class ShowBookingsInVendorUseCase implements IshowBookingsInVendorUseCase {
    private bookingDatabase: IbookingRepository
    constructor(bookingDatabase: IbookingRepository) {
        this.bookingDatabase = bookingDatabase
    }
    async showBookingsInVendor(vendorId: string,pageNo:number): Promise<{ Bookings: BookingListingEntityVendor[] | [], totalPages: number }> {
        return await this.bookingDatabase.showBookingsInVendor(vendorId,pageNo)

    }
}