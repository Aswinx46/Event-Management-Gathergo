import { Schema } from "mongoose";
import { WalletEntity } from "../../../domain/entities/wallet/wallerEntity";

export const walletSchema = new Schema<WalletEntity>({
    balance: {
        type: Number,
        required: false,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'userModel',
        required: true
    },
    userModel: {
        type: String,
        required: true,
        enum: ['client', 'vendors']
    },
    walletId: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})