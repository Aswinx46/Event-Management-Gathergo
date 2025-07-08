import { motion } from "framer-motion";
import { WalletCards, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WalletEntity {
  _id?: string;
  walletId: string;
  balance: number;
  createdAt?: Date;
  userId: string;
  userModel: "client" | "vendors";

}

interface TransactionItem {
  amount: number;
  paymentStatus: "debit" | "credit"
  paymentType: string;
  date: string;
  currency: string
  resourceType: string;
  paymentFor: {
    resourceType: string,
    resourceId: {
      _id: string,
      title: string
    }
  }
}

interface TransactionItemProps {
  amount: number;
  paymentStatus: "debit" | "credit"
  paymentType: string;
  date: string;
  currency: string
  resourceType: string,
  title: string
}

interface WalletCardProps {
  wallet: WalletEntity;
  transactions: TransactionItem[]
}

export const WalletCard = ({ wallet, transactions }: WalletCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto p-4"
    >
      <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white overflow-hidden">
        <CardHeader className="space-y-1">
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <WalletCards className="h-6 w-6" />
            <CardTitle className="text-xl font-bold">My Wallet</CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <p className="text-sm text-white/80">Available Balance</p>
              <h2 className="text-4xl font-bold">₹{wallet?.balance?.toFixed(2)}</h2>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div>
                <p className="text-white/80">Wallet ID</p>
                <p className="font-medium">{wallet?.walletId}</p>
              </div>
              <div>
                <p className="text-white/80">Account Type</p>
                <p className="font-medium capitalize">{wallet?.userModel}</p>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Transaction Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions?.map((transaction, index) => (
                <TransactionItem
                  key={index}
                  amount={transaction.amount}
                  paymentStatus={transaction.paymentStatus}
                  currency={transaction.currency}
                  date={new Date(transaction.date).toDateString()}
                  paymentType={transaction.paymentType}
                  resourceType={transaction.paymentFor.resourceType}
                  title={transaction.paymentFor.resourceId.title}
                />

              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};




import { format } from "date-fns";



const TransactionItem = ({
  amount,
  paymentStatus,
  paymentType,
  currency,
  resourceType,
  title,
  date,
}: TransactionItemProps) => {
  const isCredit = paymentStatus === "credit";
  const formattedDate = format(new Date(date), "dd MMM yyyy, hh:mm a");

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex items-center justify-between p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-4">
        {/* Icon Section */}
        <div
          className={`p-2 rounded-full ${isCredit ? "bg-green-100" : "bg-red-100"
            }`}
        >
          {isCredit ? (
            <TrendingUp className="w-5 h-5 text-green-600" />
          ) : (
            <TrendingDown className="w-5 h-5 text-red-600" />
          )}
        </div>

        {/* Info Section */}
        <div className="space-y-0.5">
          <p className="text-sm font-semibold text-gray-800 capitalize">{paymentType}</p>
          <p className="text-sm text-gray-600">{title} ({resourceType})</p>
          <p className="text-xs text-gray-500">{currency} • {formattedDate}</p>
        </div>
      </div>

      {/* Amount Section */}
      <div>
        <p
          className={`text-sm font-semibold ${isCredit ? "text-green-600" : "text-red-600"
            }`}
        >
          {isCredit ? "+" : "-"}₹{amount.toFixed(2)}
        </p>
      </div>
    </motion.div>
  );
};

export default TransactionItem;
