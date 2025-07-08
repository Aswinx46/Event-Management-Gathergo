import { TransactionsEntity } from "../../../domain/entities/wallet/transactionEntity";
import { IeventRepository } from "../../../domain/interface/repositoryInterfaces/event/eventRepositoryInterface";
import { IticketRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/eventTicket/ticketRepositoryInterface";
import { ItransactionRepository } from "../../../domain/interface/repositoryInterfaces/transactions/transactionRepositoryInterface";
import { IwalletRepository } from "../../../domain/interface/repositoryInterfaces/wallet/walletRepositoryInterface";
import { IeventCancellationUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/event/eventCancellationUseCaseInterface";
import mongoose from "mongoose";
export class EventCancellationUseCase implements IeventCancellationUseCase {
    private eventDatabase: IeventRepository
    private ticketDatabase: IticketRepositoryInterface
    private walletDatabase: IwalletRepository
    private transactionDatabase: ItransactionRepository
    constructor(eventDatabase: IeventRepository, ticketDatabase: IticketRepositoryInterface, walletDatabase: IwalletRepository, transactionDatabase: ItransactionRepository) {
        this.eventDatabase = eventDatabase
        this.ticketDatabase = ticketDatabase
        this.walletDatabase = walletDatabase
        this.transactionDatabase = transactionDatabase
    }
    async cancelEvent(eventId: string): Promise<boolean> {
        const event = await this.eventDatabase.findEventById(eventId)
        if (!event) throw new Error("No event found in this Event Id")
        const vendorWallet = await this.walletDatabase.findWalletByUserId(event.hostedBy)
        if (!vendorWallet) throw new Error("error while finding the vendor wallet id")
        const session = await mongoose.startSession()
        session.startTransaction()
        if (event.status === 'completed') throw new Error("This event cant be cancelled this is already marked as completed")
        let totalAmountToRefund = 0
        if (event.multipleTicketTypeNeeded && event.ticketTypeDescription) {
            for (let item of event.ticketTypeDescription) {
                totalAmountToRefund += item.price * item.buyedCount
            }
        } else {
            totalAmountToRefund += event.pricePerTicket! * event.ticketPurchased
        }
        const checkBalanceOfVendor = await this.walletDatabase.findTotalAmount(event.hostedBy.toString())
        if (!checkBalanceOfVendor) throw new Error('No Wallet Found for this vendor')
        if (checkBalanceOfVendor < totalAmountToRefund) throw new Error('No sufficient balance to refund')
        const ticketBookings = await this.ticketDatabase.findPersonsWhoBuyedTicketForAnEvent(event._id?.toString()!)

        try {
            for (const booking of ticketBookings) {
                const clientId = booking.clientId
                const clientWalletDetails = await this.walletDatabase.findWalletByUserId(clientId, session)
                if (!clientWalletDetails) throw new Error("No client wallet found")
                const refundAmount = booking.amount
                await this.walletDatabase.reduceMoney(event.hostedBy, refundAmount, session)
                await this.walletDatabase.addMoney(clientId, refundAmount, session)
                const vendorTx: TransactionsEntity = {
                    walletId: vendorWallet._id!,
                    currency: 'INR',
                    paymentStatus: 'debit',
                    amount: refundAmount,
                    paymentType: 'refund',
                    paymentFor: {
                        resourceType: 'event',
                        resourceId: event._id!
                    },
                    date: new Date()
                };

                const userTx: TransactionsEntity = {
                    walletId: clientWalletDetails._id!,
                    currency: 'INR',
                    paymentStatus: 'credit',
                    amount: refundAmount,
                    paymentType: 'refund',
                    paymentFor: {
                        resourceType: 'event',
                        resourceId: event._id!
                    },
                    date: new Date()
                };
                await this.transactionDatabase.createTransaction(vendorTx, session)
                await this.transactionDatabase.createTransaction(userTx, session)
            }
            const updateEvent = await this.eventDatabase.markEventAsCancelled(eventId)
            await session.commitTransaction()
            return true
        } catch (error) {
            await session.abortTransaction()
            throw error
        } finally {
            session.endSession()
        }
    }
}