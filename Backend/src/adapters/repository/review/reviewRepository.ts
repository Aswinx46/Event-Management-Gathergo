import mongoose from "mongoose";
import { ReviewDetailsDTO } from "../../../domain/entities/reviewDetailsDTO";
import { ReviewEnity } from "../../../domain/entities/reviewEntity";
import { IreviewRepository } from "../../../domain/interface/repositoryInterfaces/review/reviewRepositoryInterface";
import { reviewModel } from "../../../framerwork/database/models/reviewModel";

export class ReviewRepository implements IreviewRepository {
    async createReview(review: ReviewEnity): Promise<ReviewEnity> {
        return reviewModel.create(review)
    }
    async findReviews(targetId: string, pageNo: number, rating: number): Promise<{ reviews: ReviewDetailsDTO[] | [], totalPages: number }> {
        const page = Math.max(pageNo, 1)
        const limit = 3
        const skip = (page - 1) * limit
        const filter: any = {
            targetId: new mongoose.Types.ObjectId(targetId),
            // rating
        };
        // console.log(targetId, '+', page, typeof rating)
        const reviews = await reviewModel.find({ ...filter }).populate('reviewerId', 'name profileImage').skip(skip).limit(limit).sort({ createdAt: -1 }).lean<ReviewDetailsDTO[]>()
        const totalPages = Math.ceil(await reviewModel.countDocuments({ targetId }) / limit)
        return { reviews, totalPages }
    }
}