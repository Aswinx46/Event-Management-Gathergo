import mongoose from "mongoose";
import { BookingEntity } from "../../../domain/entities/bookingEntity";
import { BookingsInClientEntity } from "../../../domain/entities/bookingListingInClientEntity";
import { PopulatedBooking } from "../../../domain/entities/populatedBookingInClient";
import { ServiceBookingDTO } from "../../../domain/entities/serviceBookingDTO";
import { VendorDTO } from "../../../domain/entities/vendorDTO";
import { IbookingRepository } from "../../../domain/interface/repositoryInterfaces/booking/bookingsRepositoryInterface";
import { bookingModel } from "../../../framerwork/database/models/bookingModel";
import { BookingListingEntityVendor } from "../../../domain/entities/vendor/BookingListingEntityVendor";
import { PopulatedBookingEntityVendor } from "../../../domain/entities/vendor/populatedBookingEntity";

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
            date: booking.date,
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
    async showBookingsInVendor(vendorId: string): Promise<BookingListingEntityVendor[] | []> {
        const bookings = await bookingModel.find({ vendorId }).populate({
            path: 'clientId',
            select: '_id name email phone profileImage'
        }).populate({
            path: 'serviceId',
            select: '_id serviceDescription servicePrice serviceTitle serviceDuration'
        }).lean<PopulatedBookingEntityVendor[] | []>()

        const selectedBooking = bookings.map((booking): BookingListingEntityVendor => ({
            _id: booking._id,
            date: booking.date,
            email: booking.email,
            paymentStatus: booking.paymentStatus,
            phone: booking.phone,
            service: booking.serviceId,
            client: booking.clientId,
            status: booking.status,
            vendorAproval: booking.vendorAproval
        }));
        return selectedBooking
    }

}