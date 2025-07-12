import { PopulatedBookingForAdmin } from "../../../domain/entities/bookingDetailsInAdminDTO";
import { IbookingRepository } from "../../../domain/interface/repositoryInterfaces/booking/bookingsRepositoryInterface";
import { IshowbookingsInAdminUseCase } from "../../../domain/interface/useCaseInterfaces/admin/bookingManagement/showBookingsInAdminUseCaseInterface";

export class ShowBookingsInAdminUseCase implements IshowbookingsInAdminUseCase {
    private bookingDatabase: IbookingRepository
    constructor(bookingDatabase: IbookingRepository) {
        this.bookingDatabase = bookingDatabase
    }
    async showBookings(pageNo: number): Promise<{ bookings: PopulatedBookingForAdmin[] | []; totalPages: number; }> {
        const { bookings, totalPages } = await this.bookingDatabase.showAllBookingsInAdmin(pageNo)
        const bookingsMapped: PopulatedBookingForAdmin[] = bookings.map((b: any) => ({
            _id: b._id,
            serviceId: {
                _id: b.serviceId._id,
                title: b.serviceId.title,
                servicePrice: b.serviceId.servicePrice,
                categoryId: {
                    _id: b.serviceId.categoryId._id,
                    name: b.serviceId.categoryId.name,
                },
            },
            clientId: {
                _id: b.clientId._id,
                name: b.clientId.name,
                profileImage: b.clientId.profileImage,
            },
            vendorId: {
                _id: b.vendorId._id,
                name: b.vendorId.name,
                profileImage: b.vendorId.profileImage,
            },
            date: b.date,
            email: b.email,
            phone: b.phone,
            vendorApproval: b.vendorApproval,
            paymentStatus: b.paymentStatus,
            rejectionReason: b.rejectionReason,
            status: b.status,
            createdAt: b.createdAt,
            isComplete: b.isComplete,
        }));
        return { bookings: bookingsMapped, totalPages }
    }
}