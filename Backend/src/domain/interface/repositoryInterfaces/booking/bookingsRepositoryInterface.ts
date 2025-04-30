import { ObjectId } from "mongoose";
import { BookingEntity } from "../../../entities/bookingEntity";
import { BookingsInClientEntity } from "../../../entities/bookingListingInClientEntity";
import { BookingPaymentEntity } from "../../../entities/bookingPayment/bookingPaymentEntity";
import { ClientBookingDTO } from "../../../entities/clientBookingDTO";
import { BookingListingEntityVendor } from "../../../entities/vendor/BookingListingEntityVendor";

export interface IbookingRepository {
    createBooking(booking: BookingEntity): Promise<BookingEntity>
    approveBooking(bookingId: string): Promise<BookingEntity | null>
    showBookingsInClient(clientId: string, pageNo: number): Promise<{ Bookings: BookingsInClientEntity[] | [], totalPages: number }>
    showBookingsInVendor(vendorId: string, pageNo: number): Promise<{ Bookings: BookingListingEntityVendor[] | [], totalPages: number }>
    rejectBooking(bookingId: string, rejectionReasoneason: string): Promise<BookingEntity | null>
    changeStatus(bookingId: string, status: string): Promise<BookingEntity | null>
    findBookingByIdForPayment(bookingId: string | ObjectId): Promise<BookingPaymentEntity | null>
    updateBookingPaymnentStatus(bookingId: string | ObjectId, status: string): Promise<BookingEntity | null>
    findServicePriceAndDatesOfBooking(bookingId: string | ObjectId): Promise<{ date: Date[], servicePrice: number } | null>
    cancelBooking(bookingId: string): Promise<BookingEntity | null>
}