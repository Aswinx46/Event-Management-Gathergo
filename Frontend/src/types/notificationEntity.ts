
export interface NotificationEntity {
    _id?: string;
    from: {
        _id: string,
        name: string,
        profileImage?: string
    };
    to: {
        _id: string,
        name: string,
        profileImage?: string
    };
    message: string;
    read: boolean;
    senderModel: 'client' | 'vendors'
    receiverModel: 'client' | 'vendors'
}
