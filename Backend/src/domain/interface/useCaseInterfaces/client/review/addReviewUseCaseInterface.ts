import { ReviewEnity } from "../../../../entities/reviewEntity";

export interface IaddReviewUseCase {
    addReview(review: ReviewEnity): Promise<ReviewEnity>
}