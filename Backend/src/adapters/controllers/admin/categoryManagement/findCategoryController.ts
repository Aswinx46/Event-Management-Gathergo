import { Request, Response } from "express";
import { IfindCategoryUseCase } from "../../../../domain/interface/useCaseInterfaces/admin/categoryManagement/findCategoryAdminUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class FindCategoryController {
    private findCategoryUseCase: IfindCategoryUseCase
    constructor(findcategoryUseCase: IfindCategoryUseCase) {
        this.findCategoryUseCase = findcategoryUseCase
    }
    async handleFindCategory(req: Request, res: Response): Promise<void> {
        try {
            const pageNo = parseInt(req.query.pageNo as string, 10) || 1;
            const { categories, totalPages } = await this.findCategoryUseCase.findAllCategory(pageNo)
            res.status(HttpStatus.OK).json({ message: "categories fetched", categories, totalPages })
        } catch (error) {
            console.log('error while finding categories', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error while finding categories",
                error: error instanceof Error ? error.message : 'error while finding categories'
            })
        }
    }
}