export interface TransactionsEntity {
    _id?: string;
    walletId: string;
    currency: string;
    paymentStatus: "debit" | "credit";
    amount: number;
    date?: Date;
    paymentType: "refund" | "ticketBooking" | "top-up" | "bookingPayment" | "adminCommission"
}