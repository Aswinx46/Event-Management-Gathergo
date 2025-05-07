
export interface ReviewEntity {
    _id?: string
    reviewerId: string;
    targetId: string;
    targetType: 'service' | 'event';
    rating: number;
    comment: string;
}