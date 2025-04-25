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

            const { pageNo = 1, sortBy } = req.query;
            const page = parseInt(pageNo as string, 10) || 1
            const rawCategoryId = req.query.categoryId;
            const catId = (typeof rawCategoryId === 'string'
                ? rawCategoryId
                : Array.isArray(rawCategoryId)
                    ? rawCategoryId[0]
                    : null) as string | null;
            const sort = typeof sortBy === 'string' ? sortBy : 'a-z';
            const { Services, totalPages } = await this.findServiceOnCategoryBasisUseCase.findServiceBasedOnCatagory(catId, page, sort)
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