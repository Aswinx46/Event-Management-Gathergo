import { BookingEntity } from "../../../domain/entities/bookingEntity";
import { TransactionsEntity } from "../../../domain/entities/wallet/transactionEntity";
import { IbookingRepository } from "../../../domain/interface/repositoryInterfaces/booking/bookingsRepositoryInterface";
import { IpaymentRepository } from "../../../domain/interface/repositoryInterfaces/payment/paymentRepositoryInterface";
import { ItransactionRepository } from "../../../domain/interface/repositoryInterfaces/transactions/transactionRepositoryInterface";
import { IwalletRepository } from "../../../domain/interface/repositoryInterfaces/wallet/walletRepositoryInterface";
import { IStripeService } from "../../../domain/interface/serviceInterface/IpaymentService";
import { IconfirmBookingPaymentUseCase } from "../../../domain/interface/useCaseInterfaces/client/booking/confirmBookingPaymentUseCaseInterface";

export class ConfirmBookingPaymentUseCase implements IconfirmBookingPaymentUseCase {
    private bookingDatabase: IbookingRepository
    private paymentDatabase: IpaymentRepository
    private walletDatabase: IwalletRepository
    private transactionDatabase: ItransactionRepository
    private paymentService: IStripeService
    constructor(bookingDatabase: IbookingRepository, paymentDatabase: IpaymentRepository, walletDatabase: IwalletRepository, transactionDatabase: ItransactionRepository, paymentService: IStripeService) {
        this.bookingDatabase = bookingDatabase
        this.paymentDatabase = paymentDatabase
        this.walletDatabase = walletDatabase
        this.transactionDatabase = transactionDatabase
        this.paymentDatabase = paymentDatabase
        this.paymentService = paymentService
    }
    async confirmBookingPayment(booking: BookingEntity, paymentIntentId: string): Promise<boolean> {
        if (!booking) throw new Error('No booking found')
        const dateAndServicePrice = await this.bookingDatabase.findServicePriceAndDatesOfBooking(booking._id!)
        if (!dateAndServicePrice) {
            throw new Error("Booking not found or service unavailable");
        }
        const { date, servicePrice } = dateAndServicePrice
        const paymentTransaction = await this.paymentDatabase.findTransactionOfAUser(booking.clientId, booking.vendorId, booking._id!)
        if (!paymentTransaction) throw new Error("No transaction found in these users")
        const confirmBooking = await this.paymentService.confirmPayment(paymentIntentId)
        if (!confirmBooking) {
            const updateBooking = await this.bookingDatabase.updateBookingPaymnentStatus(booking._id!, 'Failed')
            throw new Error("Payment failed")
        }
        const totalAmount = date.length * servicePrice
        const adminCommission = totalAmount * 0.05
        const vendorPrice = totalAmount - adminCommission
        const adminId = process.env.ADMIN_ID
        if (!adminId) throw new Error('NO admin id found')
        const adminWallet = await this.walletDatabase.findWalletByUserId(adminId)
        if (!adminWallet) throw new Error("No admin wallet found in this Admin Id")
        const vendorWallet = await this.walletDatabase.findWalletByUserId(booking.vendorId)
        if (!vendorWallet) throw new Error("No vendorWallet found in this vendor Id")
        const adminTransaction: TransactionsEntity = {
            amount: adminCommission,
            currency: 'inr',
            paymentStatus: "credit",
            paymentType: "adminCommission",
            walletId: adminWallet._id!,
        }

        const vendorTransaction: TransactionsEntity = {
            amount: vendorPrice,
            currency: 'inr',
            paymentStatus: "credit",
            paymentType: "bookingPayment",
            walletId: vendorWallet._id!,
        }
        const CreateVendorTransaction = await this.transactionDatabase.createTransaction(vendorTransaction)
        if (!CreateVendorTransaction) throw new Error('error while creatitng vendor transcation')
        const CreateAdminTransaction = await this.transactionDatabase.createTransaction(adminTransaction)
        if (!CreateAdminTransaction) throw new Error('error while creatitng AdminTransaction')
        const addMoneyToAdminWallet = await this.walletDatabase.addMoney(adminId, adminCommission)
        if (!addMoneyToAdminWallet) throw new Error("error while adding money to admin wallet")
        const addMoneyToVendorWallet = await this.walletDatabase.addMoney(booking.vendorId, vendorPrice)
        if (!addMoneyToVendorWallet) throw new Error("error while adding money to vendor wallet")
        const updateBooking = await this.bookingDatabase.updateBookingPaymnentStatus(booking._id!, 'Successfull')
        if(!updateBooking) throw new Error('error while updating booking database')
        return true
    }
}

