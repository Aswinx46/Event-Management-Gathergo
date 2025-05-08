import { ReviewEnity } from "../../../domain/entities/reviewEntity";
import { IreviewRepository } from "../../../domain/interface/repositoryInterfaces/review/reviewRepositoryInterface";
import { IaddReviewUseCase } from "../../../domain/interface/useCaseInterfaces/client/review/addReviewUseCaseInterface";

export class AddReviewUseCase implements IaddReviewUseCase {
    private reviewDatabase: IreviewRepository
    constructor(reviewDatabase: IreviewRepository) {
        this.reviewDatabase = reviewDatabase
    }
    async addReview(review: ReviewEnity): Promise<ReviewEnity> {
        return await this.reviewDatabase.createReview(review)
    }
}