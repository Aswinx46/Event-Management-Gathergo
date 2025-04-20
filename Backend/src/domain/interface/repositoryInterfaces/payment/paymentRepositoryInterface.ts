import { PaymentEntity } from "../../../entities/payment/paymentEntity";

export interface IpaymentRepository {
    createPayment(paymentDetails: PaymentEntity): Promise<PaymentEntity>
}