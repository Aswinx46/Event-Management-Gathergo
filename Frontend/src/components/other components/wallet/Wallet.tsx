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

interface TransactionItemProps {
  amount: number;
  paymentStatus:"debit" | "credit"
  paymentType: string;
  date: string;
  currency: string
}

interface WalletCardProps {
  wallet: WalletEntity;
  transactions: TransactionItemProps[]
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
              <h2 className="text-4xl font-bold">${wallet?.balance?.toFixed(2)}</h2>
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
              {transactions?.map((transaction)=>(
                <TransactionItem 
                amount={transaction.amount}
                paymentStatus={transaction.paymentStatus}
                currency={transaction.currency}
                date={transaction.date}
                paymentType={transaction.paymentType}/>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};



const TransactionItem = ({ amount, paymentStatus, paymentType, date, currency }: TransactionItemProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${paymentStatus === 'credit' ? 'bg-green-100' : 'bg-red-100'}`}>
          {paymentStatus === 'credit' ? (
            <TrendingUp className="w-4 h-4 text-green-600" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-600" />
          )}
        </div>
        <div>
          <p className="font-medium">{paymentType}</p>
          <p className="font-medium">{currency}</p>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>
      <p className={`font-semibold ${paymentStatus === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
        {type === 'credit' ? '+' : '-'}${amount.toFixed(2)}
      </p>
    </motion.div>
  );
};
