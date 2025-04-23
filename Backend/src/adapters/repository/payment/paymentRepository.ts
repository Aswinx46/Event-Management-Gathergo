import { ObjectId } from "mongoose";
import { PaymentEntity } from "../../../domain/entities/payment/paymentEntity";
import { IpaymentRepository } from "../../../domain/interface/repositoryInterfaces/payment/paymentRepositoryInterface";
import { paymentModel } from "../../../framerwork/database/models/paymentModel";

export class PaymentRepository implements IpaymentRepository {
    async createPayment(paymentDetails: PaymentEntity): Promise<PaymentEntity> {
        return await paymentModel.create(paymentDetails)
    }
    async updatePaymentStatusOfTicket(ticketId: string, status: string): Promise<PaymentEntity | null> {
        return await paymentModel.findOneAndUpdate({ ticketId }, { status }, { new: true })
    }
    async updatePaymentStatusOfBooking(bookingId: string, status: string): Promise<PaymentEntity | null> {
        return await paymentModel.findOneAndUpdate({ bookingId }, { status }, { new: true })
    }
    async findTransactionOfAUser(senderId: string | ObjectId, receiverId: string | ObjectId, bookingId: string | ObjectId): Promise<PaymentEntity | null> {
        return await paymentModel.findOne({ userId: senderId, receiverId, bookingId }).select('-__v -createdAt')
    }
}