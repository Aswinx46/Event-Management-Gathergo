import { Request, Response } from "express";
import { IcreateCategoryUseCase } from "../../../../domain/interface/useCaseInterfaces/admin/categoryManagement/createCategoryUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class CreateCategoryController {
    private createCategoryConrollerUseCase: IcreateCategoryUseCase
    constructor(createCategoryConrollerUseCase: IcreateCategoryUseCase) {
        this.createCategoryConrollerUseCase = createCategoryConrollerUseCase
    }
    async handleCreatecategory(req: Request, res: Response): Promise<void> {
        try {
            const files = req.files as Express.Multer.File[]
            const images = files.map((item) => ({ imageBuffer: item.buffer, fileName: item.originalname }))
            const title = req.body.title
            // console.log('this is the title',title)
            const category = await this.createCategoryConrollerUseCase.createCategory(title, images)
            res.status(HttpStatus.OK).json({ message: 'category created', category })
        } catch (error) {
            console.log('error while creating category', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while creating category',
                error: error instanceof Error ? error.message : 'error while creating category'
            })
        }
    }
}