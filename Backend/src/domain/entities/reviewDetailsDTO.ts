import { ObjectId } from "mongoose";

export interface ReviewDetailsDTO {
    _id?: ObjectId | string
    reviewerId: {
        _id: ObjectId | string
        name: string
        profileImage?: string
    }
    targetId: ObjectId | string;
    targetType: 'service' | 'event';
    rating: number;
    comment: string;
}