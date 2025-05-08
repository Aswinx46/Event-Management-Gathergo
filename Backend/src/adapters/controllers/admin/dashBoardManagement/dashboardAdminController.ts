import { Request, Response } from "express";
import { IdashBoardDataUseCase } from "../../../../domain/interface/useCaseInterfaces/admin/dashBoardDatas/dashBoardDatasUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";
import { IeventGraphUseCase } from "../../../../domain/interface/useCaseInterfaces/admin/dashBoardDatas/eventGraphUseCaseInterface";

export class DashboardAdminController {
    private adminDashBoardUseCase: IdashBoardDataUseCase
    private eventGraphUseCase: IeventGraphUseCase
    constructor(adminDashBoardUseCase: IdashBoardDataUseCase, eventGraphUseCase: IeventGraphUseCase) {
        this.adminDashBoardUseCase = adminDashBoardUseCase
        this.eventGraphUseCase = eventGraphUseCase
    }
    async handleAdminDashboardata(req: Request, res: Response): Promise<void> {
        try {
            const { adminId } = req.query
            const eventDetailsForGraph = await this.eventGraphUseCase.eventGraphDetails()
            const { bookings, events, totalBookings, totalClients, totalRevenue, totalVendors } = await this.adminDashBoardUseCase.dashBoardDetails(adminId as string)
            res.status(HttpStatus.OK).json({ message: 'admin dashboard details fetched', bookings, events, totalBookings, totalClients, totalRevenue, totalVendors, eventDetailsForGraph })
        } catch (error) {
            console.log('error while fetching admin dashboard data', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while fetching admin dashborad data',
                error: error instanceof Error ? error.message : ' error while fetching admin dashboard data'
            })
        }
    }
}