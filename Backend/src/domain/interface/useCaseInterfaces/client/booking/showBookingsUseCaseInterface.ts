import { BookingsInClientEntity } from "../../../../entities/bookingListingInClientEntity";

export interface IshowBookingsInClientUseCase {
    findBookings(clientId: string): Promise<BookingsInClientEntity[] | []>
}