import { ObjectId } from "mongoose";
import { BookingEntity } from "../../../entities/bookingEntity";
import { BookingsInClientEntity } from "../../../entities/bookingListingInClientEntity";
import { BookingPaymentEntity } from "../../../entities/bookingPayment/bookingPaymentEntity";
import { BookingListingEntityVendor } from "../../../entities/vendor/BookingListingEntityVendor";
import { PopulatedBookingForAdmin } from "../../../entities/bookingDetailsInAdminDTO";
import { BookingPdfDTO } from "../../../entities/pdf/bookingsPdfDTO";

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
    showAllBookingsInAdmin(pageNo: number): Promise<{ bookings: PopulatedBookingForAdmin[] | [], totalPages: number }>
    findTotalBookings(): Promise<number>
    findTotalCountOfBookings(vendorId: string, datePeriod: Date | null): Promise<number>
    findRecentsBooking(vendorId: string): Promise<BookingListingEntityVendor[] | []>
    findBookingInSameDate(clientId: string, serviceId: string, dates: Date[]): Promise<boolean>
    findBookingByIdForDateChecking(bookingId: string): Promise<BookingEntity | null>
    findBookingWithSameDate(bookingId: string, vendorId: string, date: Date[]): Promise<BookingEntity | null>
    findBookingsOfAVendor(vendorId: string): Promise<BookingPdfDTO[] | []>
    findBookingDatesOfABooking(bookingId: string): Promise<Date[] | null>
}