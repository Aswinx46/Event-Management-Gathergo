import { Request, Response } from "express";
import { IfindServiceOnCategorybasis } from "../../../../domain/interface/useCaseInterfaces/client/service/findServiceOnCategoryBasisUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class FindServiceBasedOnCategoryController {
    private findServiceOnCategoryBasisUseCase: IfindServiceOnCategorybasis
    constructor(findServiceOnCategoryBasisUseCase: IfindServiceOnCategorybasis) {
        this.findServiceOnCategoryBasisUseCase = findServiceOnCategoryBasisUseCase
    }
    async handleFindServiceOnCategorybasis(req: Request, res: Response): Promise<void> {
        try {
            const { categoryId, pageNo } = req.params
            const page = parseInt(pageNo, 10) || 1
            const { Services, totalPages } = await this.findServiceOnCategoryBasisUseCase.findServiceBasedOnCatagory(categoryId, page)
            res.status(HttpStatus.OK).json({ message: 'Service fetched on cateogory basis', Services, totalPages })
        } catch (error) {
            console.log('error while finding services on basis of cateogry', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while finding services on basis of category',
                error: error instanceof Error ? error.message : 'error while finding services on basis of category'
            })
        }
    }
}