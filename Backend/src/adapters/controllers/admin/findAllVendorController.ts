import { Request, Response } from "express";
import { IfindAllVendorUsecase } from "../../../domain/interface/useCaseInterfaces/admin/showAllVendorUseCase";

export class FindAllVendorController {
    private findAllVendorUseCase: IfindAllVendorUsecase
    constructor(findAllVendorUseCase: IfindAllVendorUsecase) {
        this.findAllVendorUseCase = findAllVendorUseCase
    }
    async findAllVendor(req: Request, res: Response): Promise<void> {
        try {
            const pageNo = parseInt(req.query.pageNo as string, 10) || 1;
            const {vendors,totalPages} = await this.findAllVendorUseCase.findAllVendor(pageNo)
            console.log(vendors)
            res.status(200).json({ message: 'vendors fetched', vendors,totalPages })
            return
        } catch (error) {
            console.log('error while fetching all vendors', error)
            res.status(400).json({
                message: 'error while fetching vendors',
                error: error instanceof Error ? error.message : 'error while fetching vendors'
            })
        }

    }
}