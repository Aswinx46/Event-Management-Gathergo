import { Request, Response } from "express";
import { IfindCategoriesForListingInClientUseCase } from "../../../../domain/interface/useCaseInterfaces/client/category/findCategoriesInClientUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class FindCategoryForCategoryListing {
    private findCategoryForCategoryListingUseCase: IfindCategoriesForListingInClientUseCase
    constructor(findCategoryForCategoryListingUseCase: IfindCategoriesForListingInClientUseCase) {
        this.findCategoryForCategoryListingUseCase = findCategoryForCategoryListingUseCase
    }
    async handleFindCategoryForListing(req: Request, res: Response): Promise<void> {
        try {
            const pageNo = parseInt(req.params.pageNo, 10);
            const { categories, totalPages } = await this.findCategoryForCategoryListingUseCase.findCategories(pageNo)
            res.status(HttpStatus.OK).json({ message: 'Categories fetched', categories, totalPages })
        } catch (error) {
            console.log('error while fetching categories for category listing', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while fetching categories for category listing',
                error: error instanceof Error ? error.message : 'error while fetching categories for category listing'
            })
        }
    }
}