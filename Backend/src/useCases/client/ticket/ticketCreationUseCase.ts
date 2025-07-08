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
    async createTicket(ticket: TicketFromFrontend, totalCount: number, totalAmount: number, paymentIntentId: string, vendorId: string, ticketPurchasedDetails: Record<string, number>): Promise<{ createdTicket: TicketEntity[], stripeClientId: string }> {
  
        const eventDetails = await this.eventDatabase.findTotalTicketAndBookedTicket(ticket.eventId)
        if (!eventDetails) throw new Error('No event found in this ID')
        if (eventDetails?.status == "completed") throw new Error("This event is already completed")
        if (eventDetails?.status == 'cancelled') throw new Error("This event is already cancelled")
        if (eventDetails.ticketPurchased > eventDetails.totalTicket) throw new Error('Ticket sold out')
        if (eventDetails.ticketPurchased + totalCount > eventDetails.totalTicket) throw new Error(`Only ${eventDetails.totalTicket - eventDetails.ticketPurchased} tickets are available. Please reduce the quantity.`)
        const hostName = process.env.HOSTNAME
        if (!hostName) throw new Error("no host name found")
        const clientStripeId = await this.stripe.createPaymentIntent(totalAmount, 'ticket', { ticket: ticket })
        if (!clientStripeId) throw new Error("Error while creating stripe client id")
        const ticketToCreate: TicketEntity[] = []

        if (ticket.hasVariant && eventDetails) {
            let totalCount = 0
            for (let key in ticketPurchasedDetails) {
                totalCount += ticketPurchasedDetails[key]
                const count = ticketPurchasedDetails[key];
                const ticketType = eventDetails.ticketTypeDescription?.find((item) => item.ticketType === key)
                if (!ticketType) throw new Error("Invalid Ticket Type")
                if ((ticketType.maxCount - ticketType.buyedCount <= 0) || (ticketType.maxCount < (ticketType.buyedCount + ticketPurchasedDetails[key]))) throw new Error(`${key} ticket sold out`)
                for (let i = 0; i < count; i++) {
                    const ticketId = genarateRandomUuid()
                    if (!ticketId) throw new Error('Error while creating ticket id')
                    const qrLink = `${hostName}/verifyTicket/${ticketId}/${ticket.eventId}`
                    const qrCodeLink = await this.genQr.createQrLink(qrLink)
                    if (!qrCodeLink) throw new Error('Error while creating qr code link')
                    ticketToCreate.push({
                        ...ticket,
                        ticketId, // ensure this is unique per ticket if needed
                        qrCodeLink, // if this is per ticket, make sure it's unique
                        paymentStatus: "pending",
                        ticketStatus: "unused",
                        amount: ticketType.price,
                        ticketType: ticketType.ticketType,
                    });
                }
            }
            const updatedTicketDescriptions = eventDetails.ticketTypeDescription?.map((ticket) => {
                const countToAdd = ticketPurchasedDetails[ticket.ticketType] || 0
                return {
                    ...ticket,
                    buyedCount: ticket.buyedCount + countToAdd
                }
            })

            const updatedTicketDescriptionsToDb = await this.eventDatabase.updateTicketVariantsCount(eventDetails._id!, updatedTicketDescriptions!)
            if (!updatedTicketDescriptionsToDb) throw new Error("Error while updating the ticket description to the database")
            // const updateTotalTicketCount = await this.eventDatabase.updateTicketPurchaseCount(eventDetails._id!, eventDetails.ticketPurchased + totalCount)
            // if (!updateTotalTicketCount) throw new Error("Error while updating the ticket count to the database")

        } else {
            for (let i = 0; i < totalCount; i++) {
                const ticketId = genarateRandomUuid()
                if (!ticketId) throw new Error('Error while creating ticket id')
                const qrLink = `${hostName}/verifyTicket/${ticketId}/${ticket.eventId}`
                const qrCodeLink = await this.genQr.createQrLink(qrLink)
                if (!qrCodeLink) throw new Error('Error while creating qr code link')
                ticketToCreate.push({
                    ...ticket,
                    ticketId, // ensure this is unique per ticket if needed
                    qrCodeLink, // if this is per ticket, make sure it's unique
                    paymentStatus: "pending",
                    ticketStatus: "unused",
                    amount: totalAmount / totalCount,
                    ticketType:'normal'
                });
            }
        }



        // const paymentDetails: PaymentEntity = {
        //     amount: totalAmount,
        //     currency: 'inr',
        //     paymentId: paymentIntentId,
        //     receiverId: vendorId,
        //     purpose: 'ticketBooking',
        //     status: "pending",
        //     userId: ticket.clientId,
        //     ticketId: ticketId,
        // }
        // const paymentDocumentCreation = await this.paymentDatabase.createPayment(paymentDetails)
        // if (!paymentDocumentCreation) throw new Error('Error while creating payment document')

        // const originalTicket: TicketEntity = {
        //     ...ticket,
        //     ticketId: ticketId,
        //     qrCodeLink: qrCodeLink,
        //     paymentStatus: "pending",
        //     ticketStatus: "unused",
        //     // ticketCount: totalCount,
        //     amount: totalAmount,
        //     // paymentTransactionId: paymentDocumentCreation._id!,
        // }
        const createdTicket = await this.ticketDatabase.createManyTicket(ticketToCreate)

        if (!createdTicket) throw new Error('Error while creating ticket')
        return { createdTicket, stripeClientId: clientStripeId }
    }
}