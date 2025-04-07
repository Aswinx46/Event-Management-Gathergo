import { Request, Response } from "express";
import { IfindPendingVendors } from "../../../domain/interface/useCaseInterfaces/admin/findPendingVendors";
import { HttpStatus } from "../../../domain/entities/httpStatus";

export class FindAllPendingVendorController {
    private findPendingVendorUseCase: IfindPendingVendors
    constructor(findPendingVendorUseCase: IfindPendingVendors) {
        this.findPendingVendorUseCase = findPendingVendorUseCase
    }
    async findPendingVendor(req: Request, res: Response) {
        try {
            const pageNo = parseInt(req.query.pageNo as string, 10) || 1;
            const { pendingVendors, totalPages } = await this.findPendingVendorUseCase.findPendingVendors(pageNo)
            res.status(HttpStatus.OK).json({ message: 'Pending vendor fetched', pendingVendors, totalPages })
            return
        } catch (error) {
            console.log('error while fetching pending vendors', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while fetching pending vendor',
                error: error instanceof Error ? error.message : 'error while fetching pending vendors'
            })
        }
    }
}