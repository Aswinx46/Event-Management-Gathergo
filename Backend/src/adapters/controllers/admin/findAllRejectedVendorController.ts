import { Request, Response } from "express";
import { IfindAllRejectedVendor } from "../../../domain/interface/useCaseInterfaces/admin/findAllRejectedVendorsUseCaseInterface";
import { HttpStatus } from "../../../domain/httpStatus";

export class FindAllRejectedController {
    private findAllRejectedVendorUseCase: IfindAllRejectedVendor
    constructor(findAllRejectedVendorUseCase: IfindAllRejectedVendor) {
        this.findAllRejectedVendorUseCase = findAllRejectedVendorUseCase
    }
    async handleFindAllRejectedVendor(req: Request, res: Response): Promise<void> {
        try {
            const pageNo = parseInt(req.query.pageNo as string, 10) || 1;
            const { rejectedVendors, totalPages } = await this.findAllRejectedVendorUseCase.findRejectedVendors(pageNo)
            res.status(HttpStatus.OK).json({ message: 'rejected vendors fetched', rejectedVendors, totalPages })
        } catch (error) {
            console.log('error while fetching all rejected vendor', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error while fetching all rejected vendor",
                error: error instanceof Error ? error.message : 'error while fetching all rejected vendor'
            })
        }
    }
}