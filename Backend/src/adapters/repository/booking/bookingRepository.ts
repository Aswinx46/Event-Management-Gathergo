import mongoose, { ObjectId } from "mongoose";
import { BookingEntity } from "../../../domain/entities/bookingEntity";
import { BookingsInClientEntity } from "../../../domain/entities/bookingListingInClientEntity";
import { PopulatedBooking } from "../../../domain/entities/populatedBookingInClient";

import { IbookingRepository } from "../../../domain/interface/repositoryInterfaces/booking/bookingsRepositoryInterface";
import { bookingModel } from "../../../framerwork/database/models/bookingModel";
import { BookingListingEntityVendor } from "../../../domain/entities/vendor/BookingListingEntityVendor";
import { PopulatedBookingEntityVendor } from "../../../domain/entities/vendor/populatedBookingEntity";
import { BookingPaymentEntity } from "../../../domain/entities/bookingPayment/bookingPaymentEntity";
import { BookingDetailsInAdminEntity, PopulatedBookingForAdmin } from "../../../domain/entities/bookingDetailsInAdminDTO";

export class BookingRepository implements IbookingRepository {
    async createBooking(booking: BookingEntity): Promise<BookingEntity> {
        const createdBooking = await bookingModel.create(booking)
        if (!createdBooking) throw new Error('error while creating a booking')
        return createdBooking
    }
    async showBookingsInClient(clientId: string, pageNo: number): Promise<{ Bookings: BookingsInClientEntity[] | [], totalPages: number }> {
        const page = Math.max(pageNo, 1)
        const limit = 5
        const skip = (page - 1) * limit
        const totalPages = Math.ceil(await bookingModel.countDocuments({ clientId: new mongoose.Types.ObjectId(clientId) }) / limit)
        const bookings = await bookingModel.find({ clientId: new mongoose.Types.ObjectId(clientId) }).populate(
            {
                path: 'vendorId',
                select: '_id name email phone profileImage'
            }
        ).populate({
            path: 'serviceId',
            select: '_id serviceDescription servicePrice serviceTitle serviceDuration'
        }).lean<PopulatedBooking[] | []>().skip(skip).limit(limit).sort({ createdAt: -1 })

        const Bookings = bookings.map((booking): BookingsInClientEntity => ({
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


        return { Bookings, totalPages }
    }
    async showBookingsInVendor(vendorId: string, pageNo: number): Promise<{ Bookings: BookingListingEntityVendor[] | [], totalPages: number }> {
        const page = Math.max(pageNo, 1)
        const limit = 5
        const skip = (page - 1) * limit
        const totalPages = Math.ceil(await bookingModel.countDocuments({ vendorId: new mongoose.Types.ObjectId(vendorId) }) / limit)
        const bookings = await bookingModel.find({ vendorId }).populate({
            path: 'clientId',
            select: '_id name email phone profileImage'
        }).populate({
            path: 'serviceId',
            select: '_id serviceDescription servicePrice serviceTitle serviceDuration'
        }).lean<PopulatedBookingEntityVendor[] | []>().skip(skip).limit(limit).sort({ createdAt: -1 })

        const Bookings = bookings.map((booking): BookingListingEntityVendor => ({
            _id: booking._id,
            date: booking.date,
            email: booking.email,
            paymentStatus: booking.paymentStatus,
            phone: booking.phone,
            service: booking.serviceId,
            client: booking.clientId,
            status: booking.status,
            vendorApproval: booking.vendorApproval,
            rejectionReason: booking.rejectionReason
        }));
        return { Bookings, totalPages }
    }
    async approveBooking(bookingId: string): Promise<BookingEntity | null> {
        return await bookingModel.findByIdAndUpdate({ _id: bookingId }, { vendorApproval: "Approved" }, { new: true })
    }
    async rejectBooking(bookingId: string, rejectionReason: string): Promise<BookingEntity | null> {
        return await bookingModel.findByIdAndUpdate(bookingId, { vendorApproval: "Rejected", rejectionReason: rejectionReason })
    }
    async changeStatus(bookingId: string, status: string): Promise<BookingEntity | null> {
        return await bookingModel.findByIdAndUpdate(bookingId, { status: status }, { new: true })
    }
    async findBookingByIdForPayment(bookingId: string | ObjectId): Promise<BookingPaymentEntity | null> {
        const booking = await bookingModel
            .findById(bookingId)
            .select("-__v -createdAt -updatedAt")
            .populate({
                path: "serviceId",
                select: "servicePrice",
                model: "service",
            })
            .lean();
        if (!booking) return null;

        const result: BookingPaymentEntity = {
            _id: booking._id,
            clientId: booking.clientId,
            vendorId: booking.vendorId,
            date: booking.date,
            email: booking.email,
            phone: booking.phone,
            vendorApproval: booking.vendorApproval,
            paymentStatus: booking.paymentStatus,
            rejectionReason: booking.rejectionReason,
            status: booking.status,
            createdAt: booking.createdAt,
            isComplete: booking.isComplete,
            serviceId: (booking.serviceId as any)._id ?? booking.serviceId, // keep ObjectId here
            service: {
                servicePrice: (booking.serviceId as any).servicePrice || 0,
            },
        };

        return result;
    }
    async updateBookingPaymnentStatus(bookingId: string | ObjectId, status: string): Promise<BookingEntity | null> {
        return await bookingModel.findByIdAndUpdate(bookingId, { paymentStatus: status }, { new: true }).select('-__v -createdAt')
    }
    async findServicePriceAndDatesOfBooking(bookingId: string | ObjectId): Promise<{ date: Date[]; servicePrice: number; } | null> {
        const bookingDetails = await bookingModel.findById(bookingId).select('date').populate('serviceId', 'servicePrice').lean<{
            date: Date[];
            serviceId: { servicePrice: number };
        }>();
        if (!bookingDetails) return null
        return { date: bookingDetails?.date, servicePrice: bookingDetails?.serviceId.servicePrice }
    }
    async cancelBooking(bookingId: string): Promise<BookingEntity | null> {
        return await bookingModel.findByIdAndUpdate(bookingId, { status: 'Cancelled' }, { new: true })
    }
    async showAllBookingsInAdmin(pageNo: number): Promise<{ bookings: PopulatedBookingForAdmin[] | [], totalPages: number }> {
        const page = Math.max(pageNo, 1)
        const limit = 4
        const skip = (page - 1) * limit
        const bookingsRaw = await bookingModel.find().populate({
            path: 'serviceId',
            populate: {
                path: 'categoryId',
                select: 'name'
            },
            select: 'serviceTitle servicePrice'

        }).populate({
            path: 'clientId',
            select: 'name profileImage'
        }).populate({
            path: 'vendorId',
            select: 'name profileImage'
        }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean()

        const totalPages = Math.ceil(await bookingModel.countDocuments() / limit)
        const bookings: PopulatedBookingForAdmin[] = bookingsRaw.map((b: any) => ({
            _id: b._id,
            serviceId: {
                _id: b.serviceId._id,
                serviceTitle: b.serviceId.serviceTitle,
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

        return { bookings, totalPages }
    }
    async findTotalBookings(): Promise<number> {
        return bookingModel.countDocuments({ status: 'Completed' })
    }
    async findTotalCountOfBookings(vendorId: string, datePeriod: Date | null): Promise<number> {
        const query: Record<string, any> = { vendorId }

        if (datePeriod) {
            query.createdAt = { $gte: datePeriod }
        }

        return bookingModel.countDocuments(query)
    }
    async findRecentsBooking(vendorId: string): Promise<BookingListingEntityVendor[] | []> {
        return await bookingModel.find({ vendorId }).select('-__v -updatedAt')
    }
}