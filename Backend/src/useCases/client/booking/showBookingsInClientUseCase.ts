import { BookingsInClientEntity } from "../../../domain/entities/bookingListingInClientEntity";
import { IbookingRepository } from "../../../domain/interface/repositoryInterfaces/booking/bookingsRepositoryInterface";
import { IshowBookingsInClientUseCase } from "../../../domain/interface/useCaseInterfaces/client/booking/showBookingsUseCaseInterface";

export class ShowBookingsInClientUseCase implements IshowBookingsInClientUseCase {
    private bookingsDatabase: IbookingRepository
    constructor(bookingsDatabase: IbookingRepository) {
        this.bookingsDatabase = bookingsDatabase
    }
    async findBookings(clientId: string, pageNo: number): Promise<{ Bookings: BookingsInClientEntity[] | [], totalPages: number }> {
        const { Bookings, totalPages } = await this.bookingsDatabase.showBookingsInClient(clientId, pageNo)
        const mappedBookings = Bookings.map((booking): BookingsInClientEntity => ({
            _id: booking._id,
            date: booking.date,
            paymentStatus: booking.paymentStatus,
            vendorApproval: booking.vendorApproval,
            email: booking.email,
            phone: booking.phone,
            status: booking.status,
            vendor: booking.vendorId,
            service: booking.serviceId,
            rejectionReason: booking.rejectionReason
        }));
        return { Bookings: mappedBookings, totalPages }
    }
}