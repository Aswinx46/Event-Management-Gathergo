import { ReviewDetailsDTO } from "../../../domain/entities/reviewDetailsDTO";
import { IreviewRepository } from "../../../domain/interface/repositoryInterfaces/review/reviewRepositoryInterface";
import { IshowReviewsUseCase } from "../../../domain/interface/useCaseInterfaces/client/review/showReviewsUseCaseInterface";

export class ShowReviewsUseCase implements IshowReviewsUseCase {
    private reviewDatabase: IreviewRepository
    constructor(reviewDatabase: IreviewRepository) {
        this.reviewDatabase = reviewDatabase
    }
    async showReviews(targetId: string, pageNo: number, rating: number): Promise<{ reviews: ReviewDetailsDTO[] | []; totalPages: number; }> {
        return await this.reviewDatabase.findReviews(targetId, pageNo, rating)
    }
}