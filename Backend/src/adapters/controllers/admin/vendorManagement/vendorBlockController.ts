import { Request, Response } from "express";
import { IvendorBlockUseCase } from "../../../../domain/interface/useCaseInterfaces/admin/vendorManagement/vendorBlockUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";
import { IredisService } from "../../../../domain/interface/serviceInterface/IredisService";

export class VendorBlockController {
    private vendorBlockUseCase: IvendorBlockUseCase
    private redisService: IredisService
    constructor(vendorBlockUseCase: IvendorBlockUseCase, redisService: IredisService) {
        this.vendorBlockUseCase = vendorBlockUseCase
        this.redisService = redisService
    }
    async handleVendorBlock(req: Request, res: Response): Promise<void> {
        try {
            const { vendorId } = req.body
            const blockVendor = await this.vendorBlockUseCase.blockVendor(vendorId)
            const changeStatusInRedis = await this.redisService.set(`user:vendor:${vendorId}`,15 * 60 ,JSON.stringify({status:'block',vendorStatus:'approved'}))
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