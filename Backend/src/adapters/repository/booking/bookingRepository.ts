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
import { BookingPdfDTO } from "../../../domain/entities/pdf/bookingsPdfDTO";



export class BookingRepository implements IbookingRepository {
    async createBooking(booking: BookingEntity): Promise<BookingEntity> {
        const createdBooking = await bookingModel.create(booking)
        if (!createdBooking) throw new Error('error while creating a booking')
        return createdBooking
    }
    async showBookingsInClient(clientId: string, pageNo: number): Promise<{ Bookings: PopulatedBooking[] | [], totalPages: number }> {
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
            select: '_id serviceDescription servicePrice title serviceDuration'
        }).lean<PopulatedBooking[] | []>().skip(skip).limit(limit).sort({ createdAt: -1 })
        return { Bookings: bookings, totalPages }
    }
    async showBookingsInVendor(vendorId: string, pageNo: number): Promise<{ Bookings: PopulatedBookingEntityVendor[] | [], totalPages: number }> {
        const page = Math.max(pageNo, 1)
        const limit = 5
        const skip = (page - 1) * limit
        const totalPages = Math.ceil(await bookingModel.countDocuments({ vendorId: new mongoose.Types.ObjectId(vendorId) }) / limit)
        const Bookings = await bookingModel.find({ vendorId }).populate({
            path: 'clientId',
            select: '_id name email phone profileImage'
        }).populate({
            path: 'serviceId',
            select: '_id serviceDescription servicePrice title serviceDuration'
        }).lean<PopulatedBookingEntityVendor[] | []>().skip(skip).limit(limit).sort({ createdAt: -1 })


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
    async findBookingByIdForPayment(bookingId: string | ObjectId): Promise<any | null> {
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


        return booking;
    }
    async updateBookingPaymnentStatus(bookingId: string | ObjectId, status: string): Promise<BookingEntity | null> {
        return await bookingModel.findByIdAndUpdate(bookingId, { paymentStatus: status }, { new: true }).select('-__v -createdAt')
    }
    async findServicePriceAndDatesOfBooking(bookingId: string | ObjectId): Promise<{ _id: ObjectId, date: Date[]; servicePrice: number; } | null> {
        const bookingDetails = await bookingModel.findById(bookingId).select('_id date').populate('serviceId', 'servicePrice').lean<{
            _id: ObjectId;
            date: Date[];
            serviceId: { servicePrice: number };
        }>();
        if (!bookingDetails) return null
        return { _id: bookingDetails._id, date: bookingDetails?.date, servicePrice: bookingDetails?.serviceId.servicePrice }
    }
    async cancelBooking(bookingId: string): Promise<BookingEntity | null> {
        return await bookingModel.findByIdAndUpdate(bookingId, { status: 'Cancelled' }, { new: true })
    }
    async showAllBookingsInAdmin(pageNo: number): Promise<{ bookings: any[] | [], totalPages: number }> {
        const page = Math.max(pageNo, 1)
        const limit = 4
        const skip = (page - 1) * limit
        const bookingsRaw = await bookingModel.find().populate({
            path: 'serviceId',
            populate: {
                path: 'categoryId',
                select: 'name'
            },
            select: 'title servicePrice'

        }).populate({
            path: 'clientId',
            select: 'name profileImage'
        }).populate({
            path: 'vendorId',
            select: 'name profileImage'
        }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean()

        const totalPages = Math.ceil(await bookingModel.countDocuments() / limit)


        return { bookings: bookingsRaw, totalPages }
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
    async findBookingInSameDate(clientId: string, serviceId: string, dates: Date[]): Promise<boolean> {
        const conflictingBooking = await bookingModel.findOne({
            clientId,
            serviceId,
            status: { $nin: ["Rejected", "Cancelled"] },
            date: { $in: dates },
        }).select('_id');

        return !!conflictingBooking;
    }
    async findBookingByIdForDateChecking(bookingId: string): Promise<BookingEntity | null> {
        return await bookingModel.findById(bookingId).select('_id date vendorId')
    }
    async findBookingWithSameDate(bookingId: string, vendorId: string, date: Date[]): Promise<BookingEntity | null> {
        return await bookingModel.findOne({
            _id: { $ne: bookingId },
            vendorId: vendorId,
            date: { $in: date },
            vendorApproval: "Approved",
        });
    }
    async findBookingsOfAVendor(vendorId: string): Promise<BookingPdfDTO[] | []> {
        const bookings = await bookingModel.find({
            vendorId,
            vendorApproval: "Approved"
        })
            .populate("serviceId")
            .populate("clientId", "email name")
            .sort({ createdAt: -1 }).lean<BookingPdfDTO[]>()
        return bookings
    }
    async findBookingDatesOfABooking(bookingId: string): Promise<Date[] | null> {
        const booking = await bookingModel.findById(bookingId).select('date').lean();
        if (booking && booking.date) {

            return Array.isArray(booking.date) ? booking.date.map((d: any) => new Date(d)) : [];
        }
        return null;
    }
}