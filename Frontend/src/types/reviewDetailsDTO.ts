export interface ReviewDetailsDTO {
    _id?: string
    reviewerId: {
        _id: string
        name: string
        profileImage?: string
    }
    targetId: string;
    targetType: 'service' | 'event';
    rating: number;
    comment: string;
}