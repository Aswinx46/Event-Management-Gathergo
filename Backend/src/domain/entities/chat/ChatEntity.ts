import { ObjectId } from "mongoose";

export interface ChatEntity {
    _id?: ObjectId | string,
    lastMessage: string,
    lastMessageAt: string,
    senderId: ObjectId | string,
    receiverId: ObjectId | string
    senderModel: 'client' | 'vendors'
    receiverModel: 'client' | 'vendors'
}