import { ReviewEnity } from "../../../entities/reviewEntity";

export interface IreviewRepository {
    createReview(review: ReviewEnity): Promise<ReviewEnity>
}