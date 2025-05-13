import { ObjectId, Types } from "mongoose";
import { TransactionsEntity } from "../../../domain/entities/wallet/transactionEntity";
import { ItransactionRepository } from "../../../domain/interface/repositoryInterfaces/transactions/transactionRepositoryInterface";
import { transactionModel } from "../../../framerwork/database/models/transactionModel";

export class TransactionRepository implements ItransactionRepository {
    async createTransaction(transaction: TransactionsEntity): Promise<TransactionsEntity> {
        return await transactionModel.create(transaction)
    }
    async findTransactionsOfAWallet(walletId: string | ObjectId, pageNo: number): Promise<{ transactions: TransactionsEntity[] | [], totalPages: number }> {
        const page = Math.max(pageNo, 1)
        console.log(walletId)
        const limit = 5
        const skip = (page - 1) * limit
        const formattedWalletId = typeof walletId === 'string' ? new Types.ObjectId(walletId) : walletId;
        const transactions = await transactionModel.find({ walletId }).select('-__v -createdAt -updatedAt').sort({ createdAt: -1 }).skip(skip).limit(limit)
        const totalPages = Math.ceil(await transactionModel.countDocuments({ walletId: formattedWalletId }) / limit)
        return { transactions, totalPages }
    }
    async revenueChart(walletId: string, datePeriod: Date | null): Promise<{ month: string; revenue: number; }[]> {
        const matchStage: any = {
            walletId: new Types.ObjectId(walletId),
            paymentStatus: "credit",
            paymentType: { $in: ["ticketBooking", "bookingPayment"] },
        }

        if (datePeriod) {
            matchStage.date = { $gte: datePeriod }
        }
        const revenueData = await transactionModel.aggregate([
            {
                $match: { ...matchStage },
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$date" },
                        year: { $year: "$date" },
                    },
                    totalRevenue: { $sum: "$amount" },
                },
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1,
                },
            },
        ])

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const formatted = revenueData.map((entry) => ({
            month: monthNames[entry._id.month - 1],
            revenue: entry.totalRevenue,
        }))
        return formatted
    }
}