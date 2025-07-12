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
        const result: BookingPaymentEntity = {
            _id: booking._id,
            clientId: booking.clientId,
            vendorId: booking.vendorId,
            date: booking.date,
            email: booking.email,
            phone: booking.phone,
            vendorApproval: booking.vendorApproval,
            paymentStatus: booking.paymentStatus,
            rejectionReason: booking.rejectionReason,
            status: booking.status,
            createdAt: booking.createdAt,
            isComplete: booking.isComplete,
            serviceId: (booking.serviceId as any)._id ?? booking.serviceId, // keep ObjectId here
            service: {
                servicePrice: (booking.serviceId as any).servicePrice || 0,
            },
        };

        if (result.status != 'Completed') throw new Error('This Booking is not completed')
        if (result.paymentStatus == "Successfull") throw new Error('This booking is Already paid')
        const totalAmount = result.date.length * result.service.servicePrice
        const clientStripeId = await this.paymentService.createPaymentIntent(totalAmount, 'service', { booking: result })
        if (!clientStripeId) throw new Error("Error while creating stripe client id")
        const paymentDetails: PaymentEntity = {
            amount: totalAmount,
            currency: 'inr',
            paymentId: paymentIntentId,
            receiverId: result.vendorId,
            purpose: 'serviceBooking',
            status: "pending",
            userId: result.clientId,
            bookingId: result._id
        }
        const createPayment = await this.paymentDatabase.createPayment(paymentDetails)
        if (!createPayment) throw new Error('Error while creating payment document')
        return { booking: result, clientStripeId }
    }
}