import { Document, model, ObjectId } from "mongoose";
import { TransactionsEntity } from "../../../domain/entities/wallet/transactionEntity";
import { transactionSchema } from "../schema/transactionSchema";

export interface ItransactionModel extends Omit<TransactionsEntity, "_id">, Document {
    _id: ObjectId
}
export const transactionModel = model<TransactionsEntity>('transaction', transactionSchema)