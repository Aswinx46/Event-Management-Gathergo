import { Request, Response } from "express";
import { IshowReviewsUseCase } from "../../../../domain/interface/useCaseInterfaces/client/review/showReviewsUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class ShowReviewController {
    private showReviewUseCase: IshowReviewsUseCase
    constructor(showReviewUseCase: IshowReviewsUseCase) {
        this.showReviewUseCase = showReviewUseCase
    }
    async handleShowReview(req: Request, res: Response): Promise<void> {
        try {
            const { targetId, pageNo, rating } = req.query
            if (!targetId) {
                res.status(HttpStatus.BAD_REQUEST).json({ error: 'No target Id provided' })
                return
            }
            const page = parseInt(pageNo as string, 10) || 1
            const ratingForFetching = parseInt(rating as string, 10) || 5
            const { reviews, totalPages } = await this.showReviewUseCase.showReviews(targetId?.toString(), page, ratingForFetching)
            res.status(HttpStatus.OK).json({ message: "Reviews fetched", reviews, totalPages })
        } catch (error) {
            console.log('error while showing revies', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while showing reviews',
                error: error instanceof Error ? error.message : 'error while showing reviews'
            })
        }
    }
}