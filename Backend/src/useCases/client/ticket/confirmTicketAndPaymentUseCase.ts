import { ObjectId } from "mongoose";
import { TicketEntity } from "../../../domain/entities/Ticket/ticketEntity";
import { TicketFromFrontend } from "../../../domain/entities/Ticket/ticketFromFrotendType";
import { TransactionsEntity } from "../../../domain/entities/wallet/transactionEntity";
import { WalletEntity } from "../../../domain/entities/wallet/wallerEntity";
import { IeventRepository } from "../../../domain/interface/repositoryInterfaces/event/eventRepositoryInterface";
import { IticketRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/eventTicket/ticketRepositoryInterface";
import { ItransactionRepository } from "../../../domain/interface/repositoryInterfaces/transactions/transactionRepositoryInterface";
import { IwalletRepository } from "../../../domain/interface/repositoryInterfaces/wallet/walletRepositoryInterface";
import { IStripeService } from "../../../domain/interface/serviceInterface/IpaymentService";
import { IconfirmTicketAndPaymentUseCase } from "../../../domain/interface/useCaseInterfaces/client/ticket/confirmTicketAndPaymentUseCaseInterface";
import { genarateRandomUuid } from "../../../framerwork/services/randomUuid";

export class ConfirmTicketAndPaymentUseCase implements IconfirmTicketAndPaymentUseCase {
    private ticketDatabase: IticketRepositoryInterface
    private walletDatabase: IwalletRepository
    private transactionDatabase: ItransactionRepository
    private stripeService: IStripeService
    private eventDatabase: IeventRepository
    constructor(stripeService: IStripeService, eventDatabase: IeventRepository, ticketDatabase: IticketRepositoryInterface, walletDatabase: IwalletRepository, transactionDatabase: ItransactionRepository) {
        this.ticketDatabase = ticketDatabase
        this.walletDatabase = walletDatabase
        this.transactionDatabase = transactionDatabase
        this.stripeService = stripeService
        this.eventDatabase = eventDatabase
    }
    async confirmTicketAndPayment(tickets: TicketEntity[], paymentIntent: string, vendorId: string): Promise<boolean> {
        // console.log('vendor id in useCase', vendorId)
        const confirmPayment = await this.stripeService.confirmPayment(paymentIntent)
        if (confirmPayment.status !== 'succeeded') {
            throw new Error('Payment not successful');
        }
        const eventDetails = await this.eventDatabase.findTotalTicketCountAndticketPurchased(tickets[0].eventId)
        if (!eventDetails) throw new Error("No event found in this event id in confirm ticket use case")
        if (eventDetails.ticketPurchased > eventDetails.totalTicket) {
            throw new Error('Ticket full Sold out')
        } else if (eventDetails.ticketPurchased + tickets.length > eventDetails.totalTicket) {
            throw new Error('Not enough ticket available')
        }

        const newTicketPurchasedCount = eventDetails.ticketPurchased + tickets.length
        const updateTicketCount = await this.eventDatabase.updateTicketPurchaseCount(tickets[0].eventId!, newTicketPurchasedCount)
        if (!updateTicketCount) throw new Error("error while updating ticket purchased total count in confirm ticket payment use case")

        let adminCommision = 0
        let vendorPrice = 0
        for (let ticket of tickets) {
            adminCommision += ticket.amount * 0.01
            vendorPrice += ticket.amount - ticket.amount * 0.01
            const updatedTicket = await this.ticketDatabase.updatePaymentstatus(ticket._id!)
            if (!updatedTicket) throw new Error("No ticket found in this ID")
        }

        const adminId = process.env.ADMIN_ID
        if (!adminId) throw new Error('NO admin id found')
      
        const adminWallet = await this.walletDatabase.findWalletByUserId(adminId!)
        if (!adminWallet) throw new Error("No admin Wallet found in this ID")
        const adminTransaction: TransactionsEntity = {
            amount: adminCommision,
            currency: 'inr',
            paymentStatus: "credit",
            paymentType: "adminCommission",
            walletId: adminWallet._id!,
            paymentFor: {
                resourceType: "event",
                resourceId: eventDetails._id
            }
        }

        const transaction = await this.transactionDatabase.createTransaction(adminTransaction)
        const adminWalletMoneyAdding = await this.walletDatabase.addMoney(adminId, adminCommision)
        const vendorWallet = await this.walletDatabase.findWalletByUserId(vendorId)

        let vendorWalletId: string | ObjectId;

        if (vendorWallet) {
            vendorWalletId = vendorWallet._id!;
        } else {
            const generatedWalletId = genarateRandomUuid();
            const newVendorWallet: WalletEntity = {
                walletId: generatedWalletId,
                balance: 0,
                userId: vendorId,
                userModel: "vendors",
            };

            const createdWallet = await this.walletDatabase.createWallet(newVendorWallet);
            if (!createdWallet || !createdWallet._id) {
                throw new Error("Failed to create vendor wallet.");
            }

            vendorWalletId = createdWallet._id;
        }

        const vendorTransactionData: TransactionsEntity = {
            amount: vendorPrice,
            currency: 'inr',
            paymentStatus: 'credit',
            paymentType: "ticketBooking",
            walletId: vendorWalletId,
            paymentFor: {
                resourceType: "event",
                resourceId: eventDetails._id
            }
        };
        const vendorTransaction = await this.transactionDatabase.createTransaction(vendorTransactionData)
        if (!vendorTransaction) throw new Error('error while creating vendor transaction')
        const addMoneyToVendorWallet = await this.walletDatabase.addMoney(vendorId, vendorPrice)
        if (!addMoneyToVendorWallet) throw new Error("Error while adding money to vendor wallet")
        return true
    }
}