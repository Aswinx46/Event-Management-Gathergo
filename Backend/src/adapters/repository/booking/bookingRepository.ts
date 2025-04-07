import mongoose from "mongoose";
import { BookingEntity } from "../../../domain/entities/bookingEntity";
import { BookingsInClientEntity } from "../../../domain/entities/bookingListingInClientEntity";
import { PopulatedBooking } from "../../../domain/entities/populatedBookingInClient";
import { ServiceBookingDTO } from "../../../domain/entities/serviceBookingDTO";
import { VendorDTO } from "../../../domain/entities/vendorDTO";
import { IbookingRepository } from "../../../domain/interface/repositoryInterfaces/booking/bookingsRepositoryInterface";
import { bookingModel } from "../../../framerwork/database/models/bookingModel";

export class BookingRepository implements IbookingRepository {
    async createBooking(booking: BookingEntity): Promise<BookingEntity> {
        const createdBooking = await bookingModel.create(booking)
        if (!createdBooking) throw new Error('error while creating a booking')
        return createdBooking
    }
    async showBookingsInClient(clientId: string): Promise<BookingsInClientEntity[] | []> {
        console.log(clientId)
        const bookings = await bookingModel.find({ clientId: new mongoose.Types.ObjectId(clientId) }).populate(
            {
                path: 'vendorId',
                select: '_id name email phone profileImage'
            }
        ).populate({
            path: 'serviceId',
            select: '_id serviceDescription servicePrice serviceTitle serviceDuration'
        }).lean<PopulatedBooking[] | []>()

        // if (!bookings || bookings.length === 0) return [];
        const selectedBooking = bookings.map((booking): BookingsInClientEntity => ({
            _id: booking._id,
            date:booking.date,
            paymentStatus: booking.paymentStatus,
            vendorAproval: booking.vendorAproval,
            email: booking.email,
            phone: booking.phone,
            status: booking.status,
            vendor: booking.vendorId,
            service: booking.serviceId
        }));


        return selectedBooking
    }

}