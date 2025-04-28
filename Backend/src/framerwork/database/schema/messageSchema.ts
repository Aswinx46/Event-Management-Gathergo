import { Schema } from "mongoose";
import { MessageEntity } from "../../../domain/entities/chat/MessageEntity";

export const messageSchema = new Schema<MessageEntity>({
    chatId: {
        type: Schema.Types.ObjectId,
        ref: 'chat',
        required: true
    },
    messageContent: {
        type: String,
        required: true
    },
    seen: {
        type: Boolean,
        default: false
    },
    sendedTime: {
        type: Date,
        default: Date.now
    },
    senderId: {
        type: Schema.Types.ObjectId,
        refPath: 'senderModel'
    },
    senderModel: {
        type: String,
        enum: ['client', 'vendors'],
        required: true
    }

}, {
    timestamps: true
})