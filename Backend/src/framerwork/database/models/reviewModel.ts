import { Document, model, ObjectId } from "mongoose";
import { ReviewEnity } from "../../../domain/entities/reviewEntity";
import { reviewSchema } from "../schema/reviewSchema";

export interface IreviewModel extends Omit<ReviewEnity, '_id'>, Document {
    _id: ObjectId
}

export const reviewModel=model('review',reviewSchema)