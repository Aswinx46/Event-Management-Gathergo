import { Request, Response } from "express";
import { IchangeTitleAndImageCategoryUseCase } from "../../../../domain/interface/useCaseInterfaces/admin/categoryManagement/changeTitleAndImageCategoryUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class ChangeTitleAndImageCategoryController {
    private changeTitleAndImageUseCase: IchangeTitleAndImageCategoryUseCase
    constructor(changeTitleAndImageUseCase: IchangeTitleAndImageCategoryUseCase) {
        this.changeTitleAndImageUseCase = changeTitleAndImageUseCase
    }
    async handleChangeTitleAndImage(req: Request, res: Response): Promise<void> {
        try {
            const { categoryId, updates } = req.body
            const updateCategory = await this.changeTitleAndImageUseCase.changeTitleAndImage(categoryId, updates)
            res.status(HttpStatus.OK).json({ message: "Category updated" })
        } catch (error) {
            console.log('error while changning titlle and image of category', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while changning titlle and image of category',
                error: error instanceof Error ? error.message : 'error while changning titlle and image of category'
            })
        }
    }
}