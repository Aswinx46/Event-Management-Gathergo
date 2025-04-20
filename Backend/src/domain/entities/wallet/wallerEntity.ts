import { ObjectId } from "mongoose";

export interface WalletEntity {
    _id?: ObjectId;
    walletId: string;
    balance: number;
    createdAt?: Date;
    userId: ObjectId | string;
    userModel: "client" | "vendors"
}
