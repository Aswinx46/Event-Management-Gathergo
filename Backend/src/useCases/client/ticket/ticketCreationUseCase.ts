import { PaymentEntity } from "../../../domain/entities/payment/paymentEntity";
import { TicketEntity } from "../../../domain/entities/Ticket/ticketEntity";
import { TicketFromFrontend } from "../../../domain/entities/Ticket/ticketFromFrotendType";
import { IeventRepository } from "../../../domain/interface/repositoryInterfaces/event/eventRepositoryInterface";
import { IticketRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/eventTicket/ticketRepositoryInterface";
import { IpaymentRepository } from "../../../domain/interface/repositoryInterfaces/payment/paymentRepositoryInterface";
import { IStripeService } from "../../../domain/interface/serviceInterface/IpaymentService";
import { IqrServiceInterface } from "../../../domain/interface/serviceInterface/IqrService";
import { IcreateTicketUseCase } from "../../../domain/interface/useCaseInterfaces/client/ticket/ticketCreationUseCaseInterface";
import { genarateRandomUuid } from "../../../framerwork/services/randomUuid";

export class CreateTicketUseCase implements IcreateTicketUseCase {
    private eventDatabase: IeventRepository
    private ticketDatabase: IticketRepositoryInterface
    private stripe: IStripeService
    private genQr: IqrServiceInterface
    private paymentDatabase: IpaymentRepository
    constructor(eventDatabase: IeventRepository, ticketDatabase: IticketRepositoryInterface, stripe: IStripeService, genQr: IqrServiceInterface, paymentDatabase: IpaymentRepository) {
        this.ticketDatabase = ticketDatabase
        this.stripe = stripe
        this.genQr = genQr
        this.paymentDatabase = paymentDatabase
        this.eventDatabase = eventDatabase
    }
    async createTicket(ticket: TicketFromFrontend, totalCount: number, totalAmount: number, paymentIntentId: string, vendorId: string): Promise<{ createdTicket: TicketEntity, stripeClientId: string }> {
        const eventDetails = await this.eventDatabase.findTotalTicketAndBookedTicket(ticket.eventId)
        if (!eventDetails) throw new Error('No event found in this ID')
        if (eventDetails?.status == "completed") throw new Error("This event is already completed")
        if (eventDetails?.status == 'cancelled') throw new Error("This event is already cancelled")
        if (eventDetails.ticketPurchased > eventDetails.totalTicket) throw new Error('Ticket sold out')
        if (eventDetails.ticketPurchased + totalCount > eventDetails.totalTicket) throw new Error(`Only ${eventDetails.totalTicket - eventDetails.ticketPurchased} tickets are available. Please reduce the quantity.`)
        const ticketId = genarateRandomUuid()
        if (!ticketId) throw new Error('Error while creating ticket id')
        const hostName = process.env.HOSTNAME
        console.log(ticket)
        if (!hostName) throw new Error("no host name found")
        const qrLink = `${hostName}/verifyTicket/${ticketId}/${ticket.eventId}`
        const qrCodeLink = await this.genQr.createQrLink(qrLink)
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
        const createdTicket = await this.ticketDatabase.createTicket(originalTicket)
        if (!createdTicket) throw new Error('Error while creating ticket')
        return { createdTicket, stripeClientId: clientStripeId }
    }
}