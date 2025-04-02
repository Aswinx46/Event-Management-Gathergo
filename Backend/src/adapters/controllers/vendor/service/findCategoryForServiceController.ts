import { Request, Response } from "express";
import { IfindCategoryForServiceUseCase } from "../../../../domain/interface/useCaseInterfaces/vendor/service/findCategoryUseCaseInterface";
import { HttpStatus } from "../../../../domain/httpStatus";

export class FindCategoryForServiceController {
    private findCategoryForServiceUseCase: IfindCategoryForServiceUseCase
    constructor(findCategoryForServiceUseCase: IfindCategoryForServiceUseCase) {
        this.findCategoryForServiceUseCase = findCategoryForServiceUseCase
    }
    async handleFindCategoryForServiceUseCase(req: Request, res: Response): Promise<void> {
        try {
            const categories = await this.findCategoryForServiceUseCase.findCategoryForService()
            if (!categories) {
                res.status(HttpStatus.BAD_REQUEST).json({ message: 'error while fetching categories for service' })
                return
            }
            res.status(HttpStatus.OK).json({ message: 'categories fetched', categories })
        } catch (error) {
            console.log('error while fetching categories for service', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error while fetching categories for service",
                error: error instanceof Error ? error.message : 'error while fetching categories for service'
            })
        }
        
    }
}