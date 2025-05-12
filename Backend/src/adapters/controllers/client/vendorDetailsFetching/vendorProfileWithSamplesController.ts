import { Request, Response } from "express";
import { IfindVendorProfileUseCase } from "../../../../domain/interface/useCaseInterfaces/client/vendorFetching/findVendorProfileUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class VendorProfileWithSamplesController {
    private vendorProfileWithSamples: IfindVendorProfileUseCase
    constructor(vendorProfileWithSamples: IfindVendorProfileUseCase) {
        this.vendorProfileWithSamples = vendorProfileWithSamples
    }
    async handleFindVendorProfile(req: Request, res: Response): Promise<void> {
        try {
            const { vendorId } = req.params
            const vendorProfile = await this.vendorProfileWithSamples.findVendorProfile(vendorId)
            res.status(HttpStatus.OK).json({
                message: 'vendor profile fetched',
                vendorProfile
            })
        } catch (error) {
            console.log('error while finding the vendor profile', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error whiel finding the vendor profile',
                error: error instanceof Error ? error.message : 'error while finding the vendor profile'
            })
        }
    }
}