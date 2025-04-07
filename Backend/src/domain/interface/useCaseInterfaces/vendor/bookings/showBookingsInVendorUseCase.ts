import { BookingListingEntityVendor } from "../../../../entities/vendor/BookingListingEntityVendor";

export interface IshowBookingsInVendorUseCase {
    showBookingsInVendor(vendorId: string): Promise<BookingListingEntityVendor[] | []>
}