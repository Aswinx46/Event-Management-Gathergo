import { PaymentEntity } from "../../../domain/entities/payment/paymentEntity";
import { IpaymentRepository } from "../../../domain/interface/repositoryInterfaces/payment/paymentRepositoryInterface";
import { paymentModel } from "../../../framerwork/database/models/paymentModel";

export class PaymentRepository implements IpaymentRepository {
    async createPayment(paymentDetails: PaymentEntity): Promise<PaymentEntity> {
        return await paymentModel.create(paymentDetails)
    }
}