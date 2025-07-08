import { TicketEntity } from "../../../domain/entities/Ticket/ticketEntity";
import { TicketAndVendorDTO } from "../../../domain/entities/TicketAndVendorDTO";
import { TransactionsEntity } from "../../../domain/entities/wallet/transactionEntity";
import { IeventRepository } from "../../../domain/interface/repositoryInterfaces/event/eventRepositoryInterface";
import { IticketRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/eventTicket/ticketRepositoryInterface";
import { ItransactionRepository } from "../../../domain/interface/repositoryInterfaces/transactions/transactionRepositoryInterface";
import { IwalletRepository } from "../../../domain/interface/repositoryInterfaces/wallet/walletRepositoryInterface";
import { ITicketCancellationUseCase } from "../../../domain/interface/useCaseInterfaces/client/ticket/ticketCancellationUseCaseInterface";

export class TicketCancellationUseCase implements ITicketCancellationUseCase {
    private ticketDatabase: IticketRepositoryInterface
    private walletDatabase: IwalletRepository
    private transactionDatabase: ItransactionRepository
    private eventDatabase: IeventRepository
    constructor(ticketDatabase: IticketRepositoryInterface, walletDatabase: IwalletRepository, transactionDatabase: ItransactionRepository, eventDatabase: IeventRepository) {
        this.ticketDatabase = ticketDatabase
        this.walletDatabase = walletDatabase
        this.transactionDatabase = transactionDatabase
        this.eventDatabase = eventDatabase
    }
    async ticketCancellation(ticketId: string): Promise<TicketAndVendorDTO> {
        const cancelledTicket = await this.ticketDatabase.ticketCancellation(ticketId)
        // console.log('this is the cancelled ticket', cancelledTicket)
        if (!cancelledTicket) throw new Error('No ticket found in this ID for cancellation')
        const refundAmountToVendor = cancelledTicket.amount * 0.29
        const refundAmountToClient = cancelledTicket.amount - (refundAmountToVendor + cancelledTicket.amount * 0.01)
        const updateFundAmountToClient = await this.walletDatabase.addMoney(cancelledTicket.clientId, refundAmountToClient)
        if (!updateFundAmountToClient) throw new Error('Error while updating refund amount to client')
        const selectedEvent = await this.eventDatabase.findEventById(cancelledTicket.eventId._id.toString())
        if (!selectedEvent) throw new Error("No event found in this Tickets Event ID")
        const ticketIndex = selectedEvent.ticketTypeDescription?.findIndex((ticket) => ticket.ticketType === cancelledTicket.ticketType)
        if (ticketIndex === undefined || ticketIndex === -1) throw new Error("No ticket type found in the event")
        const updatePath = `ticketTypeDescription.${ticketIndex}.buyedCount`;
        const changeTicketBuyedCount = await this.eventDatabase.updateTicketVariantCountAndTotaTicketCountWhileCancelling(selectedEvent._id!, updatePath)
        if (!changeTicketBuyedCount) throw new Error("Error while updating the ticket count after ticket cancelling")
        const clientTransaction: TransactionsEntity = {
            amount: refundAmountToClient,
            currency: 'inr',
            paymentStatus: 'credit',
            paymentType: 'refund',
            walletId: updateFundAmountToClient._id!,
            paymentFor: {
                resourceType: "event",
                resourceId: cancelledTicket.eventId._id
            }
        }
        const updateCilentTransaction = await this.transactionDatabase.createTransaction(clientTransaction)
        if (!updateCilentTransaction) throw new Error('Error while creating client transction for ticket refund')

        const deductMoneyFromVendor = await this.walletDatabase.reduceMoney(cancelledTicket.eventId.hostedBy, refundAmountToClient)
        if (!deductMoneyFromVendor) throw new Error('Error while deducting money from the vendor wallet')
        const vendorTransaction: TransactionsEntity = {
            amount: refundAmountToClient,
            currency: 'inr',
            paymentStatus: 'debit',
            paymentType: 'refund',
            walletId: deductMoneyFromVendor._id!,
            paymentFor: {
                resourceType: "event",
                resourceId: cancelledTicket.eventId._id
            }
        }
        const updateVendorTransaction = await this.transactionDatabase.createTransaction(vendorTransaction)
        if (!updateVendorTransaction) throw new Error('Error while creating client transction for ticket refund')

        return cancelledTicket
    }
}