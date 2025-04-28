import { Schema } from "mongoose";
import { ChatEntity } from "../../../domain/entities/chat/ChatEntity";

export const chatSchema = new Schema<ChatEntity>({
    lastMessage: {
        type: String
    },
    lastMessageAt: {
        type: String
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        refPath: 'receiverModel'
    },
    senderId: {
        type: Schema.Types.ObjectId,
        refPath: 'senderModel'
    },
    receiverModel: {
        type: String,
        required: true,
        enum: ['client', 'vendors']
    },
    senderModel: {
        type: String,
        required: true,
        enum: ['client', 'vendors']
    }
}, {
    timestamps: true
})