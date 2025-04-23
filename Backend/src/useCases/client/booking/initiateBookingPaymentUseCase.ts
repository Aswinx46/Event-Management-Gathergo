import { BookingPaymentEntity } from "../../../domain/entities/bookingPayment/bookingPaymentEntity";
import { PaymentEntity } from "../../../domain/entities/payment/paymentEntity";
import { IbookingRepository } from "../../../domain/interface/repositoryInterfaces/booking/bookingsRepositoryInterface";
import { IpaymentRepository } from "../../../domain/interface/repositoryInterfaces/payment/paymentRepositoryInterface";
import { IStripeService } from "../../../domain/interface/serviceInterface/IpaymentService";
import { IinititateBookingPaymentUseCase } from "../../../domain/interface/useCaseInterfaces/client/booking/inititateBookingPaymentUseCaseInterface";

export class InitiateBookingPaymentUseCase implements IinititateBookingPaymentUseCase {
    private bookingDatabase: IbookingRepository
    private paymentService: IStripeService
    private paymentDatabase: IpaymentRepository
    constructor(bookingDatabase: IbookingRepository, paymentService: IStripeService, paymentDatabase: IpaymentRepository) {
        this.bookingDatabase = bookingDatabase
        this.paymentService = paymentService
        this.paymentDatabase = paymentDatabase
    }
    async inititateBookingPayment(bookingId: string, paymentIntentId: string): Promise<{ booking: BookingPaymentEntity, clientStripeId: string }> {
        const booking = await this.bookingDatabase.findBookingByIdForPayment(bookingId)
        console.log(booking)
        if (!booking) throw new Error('No booking found in this ID')
        if (booking.status != 'Completed') throw new Error('This Booking is not completed')
        if (booking.paymentStatus == "Successfull") throw new Error('This booking is Already paid')
        const totalAmount = booking.date.length * booking.service.servicePrice
        const clientStripeId = await this.paymentService.createPaymentIntent(totalAmount, 'service', { booking: booking })
        if (!clientStripeId) throw new Error("Error while creating stripe client id")
        const paymentDetails: PaymentEntity = {
            amount: totalAmount,
            currency: 'inr',
            paymentId: paymentIntentId,
            receiverId: booking.vendorId,
            purpose: 'serviceBooking',
            status: "pending",
            userId: booking.clientId,
            bookingId: booking._id
        }
        const createPayment = await this.paymentDatabase.createPayment(paymentDetails)
        if (!createPayment) throw new Error('Error while creating payment document')
        return { booking, clientStripeId }
    }
}