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
        const created = await this.bookingDatabase.createBooking(booking)
        if (!created) throw new Error("Error while creating the booking")
        const bookingDTO: BookingEntity = {
            _id: created._id,
            clientId: created.clientId,
            vendorId: created.vendorId,
            serviceId: created.serviceId,
            date: created.date,
            email: created.email,
            phone: created.phone,
            vendorApproval: created.vendorApproval,
            paymentStatus: created.paymentStatus,
            rejectionReason: created.rejectionReason,
            status: created.status,
            createdAt: created.createdAt,
            isComplete: created.isComplete
        };
        return bookingDTO
    }
}