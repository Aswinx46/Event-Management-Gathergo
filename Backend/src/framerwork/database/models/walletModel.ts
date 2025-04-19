import { Document, model, ObjectId } from "mongoose";
import { WalletEntity } from "../../../domain/entities/wallet/wallerEntity";
import { walletSchema } from "../schema/walletSchema";

export interface IwalletModel extends Omit<WalletEntity, "_id">, Document {
    _id: ObjectId
}

export const walletModel = model<WalletEntity>('wallet', walletSchema)