import { TicketEntity } from "../../../domain/entities/Ticket/ticketEntity";
import { TicketFromFrontend } from "../../../domain/entities/Ticket/ticketFromFrotendType";
import { IticketRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/eventTicket/ticketRepositoryInterface";
import { IStripeService } from "../../../domain/interface/serviceInterface/IpaymentService";
import { IqrServiceInterface } from "../../../domain/interface/serviceInterface/IqrService";
import { IcreateTicketUseCase } from "../../../domain/interface/useCaseInterfaces/client/ticket/ticketCreationUseCaseInterface";
import { genarateRandomUuid } from "../../../framerwork/services/randomUuid";

export class CreateTicketUseCase implements IcreateTicketUseCase {
    private ticketDatabase: IticketRepositoryInterface
    private stripe: IStripeService
    private genQr: IqrServiceInterface
    constructor(ticketDatabase: IticketRepositoryInterface, stripe: IStripeService, genQr: IqrServiceInterface) {
        this.ticketDatabase = ticketDatabase
        this.stripe = stripe
        this.genQr = genQr
    }
    async createTicket(ticket: TicketFromFrontend, totalCount: number, totalAmount: number): Promise<string> {
        const ticketId = genarateRandomUuid()
        const qrCodeLink = await this.genQr.createQrLink(ticketId)
        // const tickets = []
        for (let i = 0; i < totalCount; i++) {
            const originalTicket: TicketEntity = {
                ...ticket,
                ticketId: ticketId,
                qrCodeLink: qrCodeLink,
                paymentStatus: "pending",
                ticketStatus: "unused"

            }
            const ticketSave = await this.ticketDatabase.createTicket(originalTicket)
            if (!ticketSave) throw new Error('Error while creating ticket')
            // tickets.push(ticketSave._id)
        }
        const clientStripeId = await this.stripe.createPaymentIntent(totalAmount, 'ticket', { ticket: ticket })
        if (!clientStripeId) throw new Error("Error while creating stripe client id")
        return clientStripeId
    }
}