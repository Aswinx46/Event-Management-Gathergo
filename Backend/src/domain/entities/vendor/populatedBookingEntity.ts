import { ClientDTO } from "../clientDTO";
import { ServiceBookingDTO } from "../serviceBookingDTO";
import { BookingListingEntityVendor } from "./BookingListingEntityVendor";

export interface PopulatedBookingEntityVendor extends Omit<BookingListingEntityVendor, 'clientId' | 'serviceId'> {
    clientId: ClientDTO,
    serviceId: ServiceBookingDTO
}