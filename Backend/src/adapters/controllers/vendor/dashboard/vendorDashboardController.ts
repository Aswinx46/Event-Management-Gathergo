import { Request, Response } from "express";
import { IvendorDashboardUseCase } from "../../../../domain/interface/useCaseInterfaces/vendor/dashboard/vendorDashboardUseCaseInerface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";
import { Period } from "../../../../useCases/vendor/dashboard/vendorDashboardUseCase";

export class VendorDashboardController {
    private vendorDashboardUseCase: IvendorDashboardUseCase
    constructor(vendorDashboardUseCase: IvendorDashboardUseCase) {
        this.vendorDashboardUseCase = vendorDashboardUseCase
    }
    async handleVendorDashboard(req: Request, res: Response): Promise<void> {
        try {
            const { vendorId, datePeriod } = req.query
            const { recentBookings, recentEvents, revenueChart, totalBookings, totalEvents, totalRevenue,totalTickets} = await this.vendorDashboardUseCase.findVendorDashBoardDetails(vendorId as string, datePeriod as Period)
            res.status(HttpStatus.OK).json({ message: 'Vendor dashboard details fetched', recentBookings, recentEvents, revenueChart, totalBookings, totalEvents, totalRevenue,totalTickets})
        } catch (error) {
            console.log('error while fetching vendor dashboard details', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while fetching vendor dashboard details',
                error: error instanceof Error ? error.message : 'error while fetching vendor dashboard details'
            })
        }
    }
}