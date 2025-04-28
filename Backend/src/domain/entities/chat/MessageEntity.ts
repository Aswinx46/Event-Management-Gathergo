import { ObjectId } from "mongoose";

export interface MessageEntity {
    _id?: ObjectId | string,
    chatId: ObjectId,
    seen: boolean,
    messageContent: string,
    sendedTime: Date
    senderId: ObjectId | string
    senderModel: 'client' | 'vendors'
}