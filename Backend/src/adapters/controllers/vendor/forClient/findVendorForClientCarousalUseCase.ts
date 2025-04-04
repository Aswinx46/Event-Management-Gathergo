import { Request, Response } from "express";
import { IfindVendorForClientCarousalUseCase } from "../../../../domain/interface/useCaseInterfaces/client/vendorFetching/findVendorForClientUseCase";
import { HttpStatus } from "../../../../domain/httpStatus";
import { VendorEntity } from "../../../../domain/entities/vendorEntity";

export class FindVendorForClientCarousalController {
    private findVendorForClientCarousalUseCase: IfindVendorForClientCarousalUseCase
    constructor(findVendorForClientCarousalUseCase: IfindVendorForClientCarousalUseCase) {
        this.findVendorForClientCarousalUseCase = findVendorForClientCarousalUseCase
    }
    async handleFindVenodorForClientCarousal(req: Request, res: Response): Promise<void> {
        try {
            const vendors: VendorEntity[] = await this.findVendorForClientCarousalUseCase.findVendorForClientUseCase()
            res.status(HttpStatus.OK).json({ message: 'vendors fetched', vendors })
        } catch (error) {
            console.log('error while finding vendors for client carousal', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while fetching vendors for client carousal',
                error: error instanceof Error ? error.message : 'error while fetching vendors for client carousall'
            })
        }
    }
}