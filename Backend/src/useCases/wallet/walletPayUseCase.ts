import { TicketEntity } from "../../domain/entities/Ticket/ticketEntity";
import { TransactionsEntity } from "../../domain/entities/wallet/transactionEntity";
import { IeventRepository } from "../../domain/interface/repositoryInterfaces/event/eventRepositoryInterface";
import { IticketRepositoryInterface } from "../../domain/interface/repositoryInterfaces/eventTicket/ticketRepositoryInterface";
import { ItransactionRepository } from "../../domain/interface/repositoryInterfaces/transactions/transactionRepositoryInterface";
import { IwalletRepository } from "../../domain/interface/repositoryInterfaces/wallet/walletRepositoryInterface";
import { IwalletPaymentUseCase } from "../../domain/interface/useCaseInterfaces/client/wallet/walletPayUseCaseInterface";

export class WalletPayUseCase implements IwalletPaymentUseCase {
    private walletDatabase: IwalletRepository
    private transactionDatabase: ItransactionRepository
    private eventDatabase: IeventRepository
    private ticketDatabase: IticketRepositoryInterface
    constructor(walletDatabase: IwalletRepository, transactionDatabase: ItransactionRepository, eventDatabase: IeventRepository, ticketDatabase: IticketRepositoryInterface) {
        this.walletDatabase = walletDatabase
        this.transactionDatabase = transactionDatabase
        this.eventDatabase = eventDatabase
        this.ticketDatabase = ticketDatabase
    }
    async walletPay(userId: string, amount: number, paymentType: 'bookingPayment' | 'ticketBooking', ticket: TicketEntity, vendorId: string): Promise<boolean> {
        const wallet = await this.walletDatabase.findWalletByUserId(userId)
        if (!wallet) throw new Error("No wallet found in this userId")
        if (amount > wallet.balance) throw new Error("No enough balance in Wallet")
        const eventDetails = await this.eventDatabase.findTotalTicketCountAndticketPurchased(ticket.eventId!)
        if (eventDetails.ticketPurchased > eventDetails.totalTicket) {
            throw new Error('Ticket full Sold out')
        } else if (eventDetails.ticketPurchased + ticket.amount > eventDetails.totalTicket) {
            throw new Error('Not enough ticket available')
        }
        // const newTicketPurchasedCount = eventDetails.ticketPurchased + ticket.
        // const updateTicketCount = await this.eventDatabase.updateTicketPurchaseCount(ticket.eventId!, newTicketPurchasedCount)
        const updatedTicket = await this.ticketDatabase.updatePaymentstatus(ticket._id!)
        if (!updatedTicket) throw new Error("No ticket found in this ID")
        const adminId = process.env.ADMIN_ID
        if (!adminId) throw new Error('NO admin id found')
        const adminCommision = ticket.amount * 0.01
        const vendorPrice = ticket.amount - adminCommision
        const vendorWallet = await this.walletDatabase.findWalletByUserId(vendorId)
        if (!vendorWallet) throw new Error("No vendor wallet found")
        const vendorWalletId = vendorWallet?._id!.toString()
        const adminWallet = await this.walletDatabase.findWalletByUserId(adminId!)
        if (!adminWallet) throw new Error("No admin Wallet found in this ID")
        const adminTransaction: TransactionsEntity = {
            amount: adminCommision,
            currency: 'inr',
            paymentStatus: "credit",
            paymentType: "adminCommission",
            walletId: adminWallet._id!,
        }

        const transaction = await this.transactionDatabase.createTransaction(adminTransaction)
        const adminWalletMoneyAdding = await this.walletDatabase.addMoney(adminId, adminCommision)


        const payWithWallet = await this.walletDatabase.payWithWallet(userId, amount)
        const userTransaction: TransactionsEntity = {
            amount: amount,
            currency: 'inr',
            paymentStatus: "credit",
            paymentType: paymentType,
            walletId: wallet._id!,
        }
        const vendorTransactionData: TransactionsEntity = {
            amount: vendorPrice,
            currency: 'inr',
            paymentStatus: 'credit',
            paymentType: "ticketBooking",
            walletId: vendorWalletId,
        };

        const createTransaction = await this.transactionDatabase.createTransaction(userTransaction)
        const createTransactionVendor = await this.transactionDatabase.createTransaction(vendorTransactionData)
        if (!createTransactionVendor) throw new Error("error while creating vendor transaction")
        if (!createTransaction) throw new Error('error while creating transaction')
        if (!payWithWallet) throw new Error("Error while paying ticket bill with wallet money")
        return true
    }
}