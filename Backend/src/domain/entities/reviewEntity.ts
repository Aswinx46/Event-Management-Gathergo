import { ObjectId } from "mongoose";

export interface ReviewEnity {
    _id?: ObjectId | string
    reviewerId: ObjectId | string;
    targetId: ObjectId | string;
    targetType: 'service' | 'event';
    rating: number;
    comment: string;
}