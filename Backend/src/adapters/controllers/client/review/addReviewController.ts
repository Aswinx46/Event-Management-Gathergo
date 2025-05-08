import { Request, Response } from "express";
import { IaddReviewUseCase } from "../../../../domain/interface/useCaseInterfaces/client/review/addReviewUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";
import { ReviewEnity } from "../../../../domain/entities/reviewEntity";

export class AddReviewController {
    private addReviewUseCase: IaddReviewUseCase
    constructor(addReviewUseCase: IaddReviewUseCase) {
        this.addReviewUseCase = addReviewUseCase
    }
    async handleAddReview(req: Request, res: Response): Promise<void> {
        try {
            const { review } = req.body
            await this.addReviewUseCase.addReview(review)
            res.status(HttpStatus.CREATED).json({ message: "Review Added" })
        } catch (error) {
            console.log('error while adding review', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error while adding review",
                error: error instanceof Error ? error.message : 'error while adding review'
            })
        }
    }
}