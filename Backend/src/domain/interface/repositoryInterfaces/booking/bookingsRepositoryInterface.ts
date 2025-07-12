import { ObjectId } from "mongoose";
import { BookingEntity } from "../../../entities/bookingEntity";
import { BookingListingEntityVendor } from "../../../entities/vendor/BookingListingEntityVendor";

import { BookingPdfDTO } from "../../../entities/pdf/bookingsPdfDTO";
import { PopulatedBooking } from "../../../entities/populatedBookingInClient";
import { PopulatedBookingEntityVendor } from "../../../entities/vendor/populatedBookingEntity";

export interface IbookingRepository {
    createBooking(booking: BookingEntity): Promise<BookingEntity>
    approveBooking(bookingId: string): Promise<BookingEntity | null>
    showBookingsInClient(clientId: string, pageNo: number): Promise<{ Bookings: PopulatedBooking[] | [], totalPages: number }>
    showBookingsInVendor(vendorId: string, pageNo: number): Promise<{ Bookings: PopulatedBookingEntityVendor[] | [], totalPages: number }>
    rejectBooking(bookingId: string, rejectionReasoneason: string): Promise<BookingEntity | null>
    changeStatus(bookingId: string, status: string): Promise<BookingEntity | null>
    findBookingByIdForPayment(bookingId: string | ObjectId): Promise<any | null>
    updateBookingPaymnentStatus(bookingId: string | ObjectId, status: string): Promise<BookingEntity | null>
    findServicePriceAndDatesOfBooking(bookingId: string | ObjectId): Promise<{ _id: ObjectId, date: Date[], servicePrice: number } | null>
    cancelBooking(bookingId: string): Promise<BookingEntity | null>
    showAllBookingsInAdmin(pageNo: number): Promise<{ bookings: any[] | [], totalPages: number }>
    findTotalBookings(): Promise<number>
    findTotalCountOfBookings(vendorId: string, datePeriod: Date | null): Promise<number>
    findRecentsBooking(vendorId: string): Promise<BookingListingEntityVendor[] | []>
    findBookingInSameDate(clientId: string, serviceId: string, dates: Date[]): Promise<boolean>
    findBookingByIdForDateChecking(bookingId: string): Promise<BookingEntity | null>
    findBookingWithSameDate(bookingId: string, vendorId: string, date: Date[]): Promise<BookingEntity | null>
    findBookingsOfAVendor(vendorId: string): Promise<BookingPdfDTO[] | []>
    findBookingDatesOfABooking(bookingId: string): Promise<Date[] | null>
}