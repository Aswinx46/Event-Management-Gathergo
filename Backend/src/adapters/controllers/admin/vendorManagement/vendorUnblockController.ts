import { Request, Response } from "express";
import { IvendorUnblockUsecase } from "../../../../domain/interface/useCaseInterfaces/admin/vendorManagement/vendorUnblockUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class VendorUnblockController {
    private vendorUnblockUseCase: IvendorUnblockUsecase
    constructor(vendorUnblockUseCase: IvendorUnblockUsecase) {
        this.vendorUnblockUseCase = vendorUnblockUseCase
    }
    async handleVendorUnblock(req: Request, res: Response): Promise<void> {
        try {
            const { vendorId } = req.body
            const unblockUser = await this.vendorUnblockUseCase.vendorUnblock(vendorId)
            if (unblockUser) res.status(HttpStatus.OK).json({ message: "Vendor Unblocked" })
        } catch (error) {
            console.log('error while unblocking vendor', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error while unblocking vendor",
                error: error instanceof Error ? error.message : "error while unblocking vendor"
            })
        }
    }
}