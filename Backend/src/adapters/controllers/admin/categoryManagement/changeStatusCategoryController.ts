import { Request, Response } from "express";
import { IchangeStatusOfCategoryUseCase } from "../../../../domain/interface/useCaseInterfaces/admin/categoryManagement/changeStatusOfCategoryUsecaseI";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class ChangeStatusCategoryController {
    private changeStatusControllerUseCase: IchangeStatusOfCategoryUseCase
    constructor(changeStatusControllerUseCase: IchangeStatusOfCategoryUseCase) {
        this.changeStatusControllerUseCase = changeStatusControllerUseCase
    }
    async handleChangeStatusOfCategory(req: Request, res: Response): Promise<void> {
        try {
            const { categoryId } = req.body
            const changeStatusOfCategory = await this.changeStatusControllerUseCase.changeStatusCategory(categoryId)
            if (changeStatusOfCategory) res.status(HttpStatus.OK).json({ message: 'Category Status Changed' })
        } catch (error) {
            console.log('error while changing the status of the category', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while changing the status of the category',
                error: error instanceof Error ? error.message : 'error while changing the status of the category'
            })
        }
    }
}