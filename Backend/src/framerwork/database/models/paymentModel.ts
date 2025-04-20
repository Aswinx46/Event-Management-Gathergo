import { Document, model, ObjectId } from "mongoose";
import { PaymentEntity } from "../../../domain/entities/payment/paymentEntity";
import { paymentSchema } from "../schema/payementSchema";

export interface IpaymentModel extends Omit<PaymentEntity, '_id'>, Document {
    _id: ObjectId
}
export const paymentModel = model<PaymentEntity>('payment', paymentSchema)