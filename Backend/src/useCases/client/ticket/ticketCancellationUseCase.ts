import { TicketEntity } from "../../../domain/entities/Ticket/ticketEntity";
import { TicketAndVendorDTO } from "../../../domain/entities/TicketAndVendorDTO";
import { TransactionsEntity } from "../../../domain/entities/wallet/transactionEntity";
import { IticketRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/eventTicket/ticketRepositoryInterface";
import { ItransactionRepository } from "../../../domain/interface/repositoryInterfaces/transactions/transactionRepositoryInterface";
import { IwalletRepository } from "../../../domain/interface/repositoryInterfaces/wallet/walletRepositoryInterface";
import { ITicketCancellationUseCase } from "../../../domain/interface/useCaseInterfaces/client/ticket/ticketCancellationUseCaseInterface";

export class TicketCancellationUseCase implements ITicketCancellationUseCase {
    private ticketDatabase: IticketRepositoryInterface
    private walletDatabase: IwalletRepository
    private transactionDatabase: ItransactionRepository
    constructor(ticketDatabase: IticketRepositoryInterface, walletDatabase: IwalletRepository, transactionDatabase: ItransactionRepository) {
        this.ticketDatabase = ticketDatabase
        this.walletDatabase = walletDatabase
        this.transactionDatabase = transactionDatabase
    }
    async ticketCancellation(ticketId: string): Promise<TicketAndVendorDTO> {
        const cancelledTicket = await this.ticketDatabase.ticketCancellation(ticketId)
        if (!cancelledTicket) throw new Error('No ticket found in this ID for cancellation')
        const refundAmountToClient = cancelledTicket.totalAmount * 0.29
        const updateFundAmountToClient = await this.walletDatabase.addMoney(cancelledTicket.clientId, refundAmountToClient)
        if (!updateFundAmountToClient) throw new Error('Error while updating refund amount to client')
        const clientTransaction: TransactionsEntity = {
            amount: refundAmountToClient,
            currency: 'inr',
            paymentStatus: 'credit',
            paymentType: 'refund',
            walletId: updateFundAmountToClient._id!,
        }
        const updateCilentTransaction = await this.transactionDatabase.createTransaction(clientTransaction)
        if (!updateCilentTransaction) throw new Error('Error while creating client transction for ticket refund')
        console.log('this is the populated event', cancelledTicket)
        const deductMoneyFromVendor = await this.walletDatabase.reduceMoney(cancelledTicket.eventId.hostedBy, refundAmountToClient)
        if (!deductMoneyFromVendor) throw new Error('Error while deducting money from the vendor wallet')
        const vendorTransaction: TransactionsEntity = {
            amount: refundAmountToClient,
            currency: 'inr',
            paymentStatus: 'debit',
            paymentType: 'refund',
            walletId: deductMoneyFromVendor._id!,
        }
        const updateVendorTransaction = await this.transactionDatabase.createTransaction(vendorTransaction)
        if (!updateVendorTransaction) throw new Error('Error while creating client transction for ticket refund')

        return cancelledTicket
    }
}