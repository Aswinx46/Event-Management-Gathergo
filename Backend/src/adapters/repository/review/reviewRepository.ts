import { ReviewEnity } from "../../../domain/entities/reviewEntity";
import { IreviewRepository } from "../../../domain/interface/repositoryInterfaces/review/reviewRepositoryInterface";
import { reviewModel } from "../../../framerwork/database/models/reviewModel";

export class ReviewRepository implements IreviewRepository {
    async createReview(review: ReviewEnity): Promise<ReviewEnity> {
        return reviewModel.create(review)
    }
}