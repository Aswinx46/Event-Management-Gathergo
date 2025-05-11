import { Request, Response } from "express";
import { IfindWorkSamplesOfAVendorUseCase } from "../../../../domain/interface/useCaseInterfaces/vendor/workSamples/findWorkSamplesOfAVendorUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class FindWorkSamplesOfAVendorController {
    private findWorkSamplesOfAVendorUseCase: IfindWorkSamplesOfAVendorUseCase
    constructor(findWorkSamplesOfAVendorUseCase: IfindWorkSamplesOfAVendorUseCase) {
        this.findWorkSamplesOfAVendorUseCase = findWorkSamplesOfAVendorUseCase
    }
    async handleFindWorkSampleOfVendor(req: Request, res: Response): Promise<void> {
        try {
            const { vendorId, pageNo } = req.query
            if (!vendorId || !pageNo) {
                res.status(HttpStatus.BAD_REQUEST).json({ error: "No vendor id found or no pageNo found" })
                return
            }
            const page = parseInt(pageNo?.toString(), 10) || 1
            const { totalPages, workSamples } = await this.findWorkSamplesOfAVendorUseCase.findWorkSamples(vendorId.toString(), page)
            res.status(HttpStatus.OK).json({ message: 'Work samples fetched', workSamples, totalPages })
        } catch (error) {
            console.log('error while finding the workSamples of vendor', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while finding the worksamples of a vendor',
                error: error instanceof Error ? error.message : 'error while finding the work samples of vendor'
            })
        }
    }
}