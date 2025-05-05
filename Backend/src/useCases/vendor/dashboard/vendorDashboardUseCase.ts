import { EventEntity } from "../../../domain/entities/event/eventEntity";
import { BookingListingEntityVendor } from "../../../domain/entities/vendor/BookingListingEntityVendor";
import { IbookingRepository } from "../../../domain/interface/repositoryInterfaces/booking/bookingsRepositoryInterface";
import { IeventRepository } from "../../../domain/interface/repositoryInterfaces/event/eventRepositoryInterface";
import { ItransactionRepository } from "../../../domain/interface/repositoryInterfaces/transactions/transactionRepositoryInterface";
import { IwalletRepository } from "../../../domain/interface/repositoryInterfaces/wallet/walletRepositoryInterface";
import { IvendorDashboardUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/dashboard/vendorDashboardUseCaseInerface";

export type Period = "today" | "week" | "month" | "year" | "allTime"
interface Revenue {
    month: string,
    revenue: number
}

export class VendorDashboardUseCase implements IvendorDashboardUseCase {
    private walletDatabase: IwalletRepository
    private transactionDatabase: ItransactionRepository
    private eventDatabase: IeventRepository
    private bookingDatabase: IbookingRepository
    constructor(walletDatabase: IwalletRepository, transactionDatabase: ItransactionRepository, eventDatabase: IeventRepository, bookingDatabase: IbookingRepository) {
        this.walletDatabase = walletDatabase
        this.transactionDatabase = transactionDatabase
        this.eventDatabase = eventDatabase
        this.bookingDatabase = bookingDatabase
    }
    async findVendorDashBoardDetails(vendorId: string, Period: Period): Promise<{ revenueChart: Revenue[]; totalBookings: number; totalEvents: number, recentEvents: EventEntity[], recentBookings: BookingListingEntityVendor[], totalRevenue: number, totalTickets: number }> {
        const wallet = await this.walletDatabase.findWalletByUserId(vendorId)
        if (!wallet) throw new Error('No wallet found in this userId')
        const walletId = wallet._id!.toString()
        const now = new Date()

        function getStartDate(period: Period): Date | null {
            const now = new Date()

            switch (period) {
                case "today":
                    return new Date(now.getFullYear(), now.getMonth(), now.getDate())

                case "week": {
                    const day = now.getDay()
                    const diff = now.getDate() - day + (day === 0 ? -6 : 1)
                    return new Date(now.getFullYear(), now.getMonth(), diff)
                }

                case "month":
                    return new Date(now.getFullYear(), now.getMonth(), 1)

                case "year":
                    return new Date(now.getFullYear(), 0, 1)

                case "allTime":
                    return null // No filtering

                default:
                    return new Date(0)
            }
        }

        const datePeriod = getStartDate(Period)
        const revenueDetails = await this.transactionDatabase.revenueChart(walletId, datePeriod)
        const totalBookings = await this.bookingDatabase.findTotalCountOfBookings(vendorId, datePeriod)
        const totalEvents = await this.eventDatabase.findTotalEvents(vendorId, datePeriod)
        const recentBookings = await this.bookingDatabase.findRecentsBooking(vendorId)
        const recentEvents = await this.eventDatabase.findRecentEvents(vendorId)
        const totalTickets = await this.eventDatabase.findTotalticketsSold(vendorId, datePeriod)
        const totalRevenue = wallet.balance
        return { revenueChart: revenueDetails, totalBookings, totalEvents, recentBookings, recentEvents, totalRevenue, totalTickets }
    }
}