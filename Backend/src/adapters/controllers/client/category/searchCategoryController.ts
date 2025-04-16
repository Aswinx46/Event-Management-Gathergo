import { Request, Response } from "express";
import { IsearhCategoryUseCase } from "../../../../domain/interface/useCaseInterfaces/client/category/searchCategoryUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class SearchCategoryController {
    private searchCategoryUseCase: IsearhCategoryUseCase
    constructor(searchCategoryUseCase: IsearhCategoryUseCase) {
        this.searchCategoryUseCase = searchCategoryUseCase
    }
    async handleSearchCategory(req: Request, res: Response): Promise<void> {
        try {
            const { query } = req.query
            console.log(query)
            if (typeof query !== 'string') {
                res.status(HttpStatus.BAD_REQUEST).json({ message: 'Invalid search query' });
                return
            }

            const searchedCategories = await this.searchCategoryUseCase.searchCategory(query)
            res.status(HttpStatus.OK).json({ message: "Category fetched", searchedCategories })
        } catch (error) {
            console.log('error while searching category', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error whille searching category",
                error: error instanceof Error ? error.message : 'error while searching category'
            })
        }
    }
}