import { Request, Response } from "express";
import { IrejectVendorUseCase } from "../../../domain/interface/useCaseInterfaces/admin/rejectVendorUseCaseInterface";
import { HttpStatus } from "../../../domain/httpStatus";

export class RejectVendorControllerAdmin {
    private rejectVendorUseCase: IrejectVendorUseCase
    constructor(rejectVendorUseCase: IrejectVendorUseCase) {
        this.rejectVendorUseCase = rejectVendorUseCase
    }
    async handleRejectVendor(req: Request, res: Response): Promise<void> {
        try {
            const { vendorId, newStatus, rejectionReason } = req.body
            await this.rejectVendorUseCase.rejectVendor(vendorId, newStatus, rejectionReason)
            res.status(HttpStatus.OK).json({ message: "Vendor rejected" })
        } catch (error) {
            console.log('error while rejecting vendor', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error while rejecting venodr",
                error: error instanceof Error ? error.message : 'error while rejecting vendor'
            })
        }
    }
}