import { BookingsInClientEntity } from "../../../../entities/bookingListingInClientEntity";

export interface IshowBookingsInClientUseCase {
    findBookings(clientId: string, pageNo: number): Promise<{ Bookings: BookingsInClientEntity[] | [], totalPages: number }>
}