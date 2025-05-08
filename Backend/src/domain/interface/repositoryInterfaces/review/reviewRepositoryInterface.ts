import { ReviewDetailsDTO } from "../../../entities/reviewDetailsDTO";
import { ReviewEnity } from "../../../entities/reviewEntity";

export interface IreviewRepository {
    createReview(review: ReviewEnity): Promise<ReviewEnity>
    findReviews(targetId: string, pageNo: number, rating: number): Promise<{ reviews: ReviewDetailsDTO[] | [], totalPages: number }>
}