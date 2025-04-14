import { Request, Response } from "express";
import { IvendorBlockUseCase } from "../../../../domain/interface/useCaseInterfaces/admin/vendorManagement/vendorBlockUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class VendorBlockController {
    private vendorBlockUseCase: IvendorBlockUseCase
    constructor(vendorBlockUseCase: IvendorBlockUseCase) {
        this.vendorBlockUseCase = vendorBlockUseCase
    }
    async handleVendorBlock(req: Request, res: Response): Promise<void> {
        try {
            const { vendorId } = req.body
            const blockVendor = await this.vendorBlockUseCase.blockVendor(vendorId)
            if (blockVendor) res.status(HttpStatus.OK).json({ message: "Vendor Blocked" })
        } catch (error) {
            console.log('error while blocking Vendor', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error while blocking vendor",
                error: error instanceof Error ? error.message : 'error while blocking vendor'
            })
        }
    }
}