import { BookingsInClientEntity } from "./bookingListingInClientEntity";
import { ServiceBookingDTO } from "./serviceBookingDTO";
import { VendorDTO } from "./vendorDTO";

export interface PopulatedBooking extends Omit<BookingsInClientEntity, 'vendorId' | 'serviceId'> {
    vendorId: VendorDTO,
    serviceId: ServiceBookingDTO
}