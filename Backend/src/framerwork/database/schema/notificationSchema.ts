import { Schema } from "mongoose";
import { NotificationEntity } from "../../../domain/entities/NotificationEntity";

export const notificationSchema = new Schema<NotificationEntity>({
    from: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'senderModel'
    },
    message: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    },
    to: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'receiverModel'
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