import { BookingDetailsInAdminEntity, PopulatedBookingForAdmin } from "../../../../entities/bookingDetailsInAdminDTO";
import { EventEntity } from "../../../../entities/event/eventEntity";

export interface IdashBoardDataUseCase {
    dashBoardDetails(adminId:string):Promise<{bookings:PopulatedBookingForAdmin[]| [] , events:EventEntity[] | [],totalVendors:number,totalClients:number,totalRevenue:number,totalBookings:number}>
}