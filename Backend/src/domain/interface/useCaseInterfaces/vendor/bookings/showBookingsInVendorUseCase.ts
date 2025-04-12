import { BookingListingEntityVendor } from "../../../../entities/vendor/BookingListingEntityVendor";

export interface IshowBookingsInVendorUseCase {
    showBookingsInVendor(vendorId: string, pageNo: number): Promise<{ Bookings: BookingListingEntityVendor[] | [], totalPages: number }>
}