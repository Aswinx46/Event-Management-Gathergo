import { EventEntity } from "../../../../entities/event/eventEntity"
import { BookingListingEntityVendor } from "../../../../entities/vendor/BookingListingEntityVendor"

interface Revenue {
    month: string,
    revenue: number
}

type Period = "today" | "week" | "month" | "year" | "allTime"

export interface IvendorDashboardUseCase {
    findVendorDashBoardDetails(vendorId: string, Period: Period): Promise<{ revenueChart: Revenue[], totalBookings: number, totalEvents: number, recentEvents: EventEntity[], recentBookings: BookingListingEntityVendor[], totalRevenue: number, totalTickets: number }>
}