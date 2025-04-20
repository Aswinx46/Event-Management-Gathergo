import { PaymentEntity } from "../../../domain/entities/payment/paymentEntity";
import { TicketEntity } from "../../../domain/entities/Ticket/ticketEntity";
import { TicketFromFrontend } from "../../../domain/entities/Ticket/ticketFromFrotendType";
import { IticketRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/eventTicket/ticketRepositoryInterface";
import { IpaymentRepository } from "../../../domain/interface/repositoryInterfaces/payment/paymentRepositoryInterface";
import { IStripeService } from "../../../domain/interface/serviceInterface/IpaymentService";
import { IqrServiceInterface } from "../../../domain/interface/serviceInterface/IqrService";
import { IcreateTicketUseCase } from "../../../domain/interface/useCaseInterfaces/client/ticket/ticketCreationUseCaseInterface";
import { genarateRandomUuid } from "../../../framerwork/services/randomUuid";

export class CreateTicketUseCase implements IcreateTicketUseCase {
    private ticketDatabase: IticketRepositoryInterface
    private stripe: IStripeService
    private genQr: IqrServiceInterface
    private paymentDatabase: IpaymentRepository
    constructor(ticketDatabase: IticketRepositoryInterface, stripe: IStripeService, genQr: IqrServiceInterface, paymentDatabase: IpaymentRepository) {
        this.ticketDatabase = ticketDatabase
        this.stripe = stripe
        this.genQr = genQr
        this.paymentDatabase = paymentDatabase
    }
    async createTicket(ticket: TicketFromFrontend, totalCount: number, totalAmount: number, paymentIntentId: string, vendorId: string): Promise<string> {
        const ticketId = genarateRandomUuid()
        if (!ticketId) throw new Error('Error while creating ticket id')
        const qrCodeLink = await this.genQr.createQrLink(ticketId)
        if (!qrCodeLink) throw new Error('Error while creating qr code link')
        const clientStripeId = await this.stripe.createPaymentIntent(totalAmount, 'ticket', { ticket: ticket })
        if (!clientStripeId) throw new Error("Error while creating stripe client id")
        const paymentDetails: PaymentEntity = {
            amount: totalAmount,
            currency: 'inr',
            paymentId: paymentIntentId,
            receiverId: vendorId,
            purpose: 'ticketBooking',
            status: "pending",
            userId: ticket.clientId,
            ticketId: ticketId,
        }
        const paymentDocumentCreation = await this.paymentDatabase.createPayment(paymentDetails)
        if (!paymentDocumentCreation) throw new Error('Error while creating payment document')
        const originalTicket: TicketEntity = {
            ...ticket,
            ticketId: ticketId,
            qrCodeLink: qrCodeLink,
            paymentStatus: "pending",
            ticketStatus: "unused",
            ticketCount: totalCount,
            totalAmount: totalAmount,
            paymentTransactionId: paymentDocumentCreation._id!,
        }
        const ticketSave = await this.ticketDatabase.createTicket(originalTicket)
        if (!ticketSave) throw new Error('Error while creating ticket')
        return clientStripeId
    }
}