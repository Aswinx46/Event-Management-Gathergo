
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {  CreditCard, AlertTriangle, CheckCircle } from 'lucide-react';
// import { toast } from '@/components/ui/use-toast'; // Or sonner: import { toast } from "sonner" - REMOVED

interface TicketEntity {
  clientId: string;
  email: string;
  phone: string;
  eventId: string;
}



interface WalletPaymentProps {
  amount: number;
  ticketData: TicketEntity;
  type: 'ticketBooking';
  totalTicketCount: number;
  vendorId: string; // Assuming event.hostedBy is a string
  onPaymentProcess: () => void; // Callback for when payment is initiated
  onCancel: () => void; // Callback to go back or cancel
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1 
    } 
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const WalletPayment: React.FC<WalletPaymentProps> = ({
  amount,
  ticketData,
  type,
  totalTicketCount,
  vendorId,
  onPaymentProcess,
  onCancel,
}) => {

  const handleConfirmPayment = () => {
    console.log('Processing wallet payment for:', { amount, ticketData, vendorId });
    // Here, you would typically call a function to process the wallet payment.
    // For now, we'll simulate a success and call onPaymentProcess.
    // toast({ // REMOVED
    //   title: "Payment Initiated",
    //   description: `Processing your payment of $${amount.toFixed(2)} from your wallet.`,
    //   className: "bg-blue-500 text-white",
    // });
    onPaymentProcess(); 
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 text-gray-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="w-full max-w-md bg-gray-800/70 backdrop-blur-md rounded-xl shadow-2xl p-8"
        variants={itemVariants}
      >
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <CreditCard className="w-16 h-16 mx-auto mb-4 text-green-400" />
          <h1 className="text-3xl font-bold text-white">Wallet Payment</h1>
          <p className="text-gray-400">Confirm your payment details below.</p>
        </motion.div>

        <motion.div className="space-y-6 mb-8" variants={itemVariants}>
          <div className="bg-gray-700/50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-green-300 mb-3">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">Item:</span>
                <span className="font-medium text-white">{type === 'ticketBooking' ? 'Event Ticket(s)' : 'Purchase'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Quantity:</span>
                <span className="font-medium text-white">{totalTicketCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Event ID:</span>
                <span className="font-medium text-white truncate w-40" title={ticketData.eventId}>{ticketData.eventId}</span>
              </div>
               <hr className="border-gray-600 my-3"/>
              <div className="flex justify-between text-lg">
                <span className="text-gray-200 font-semibold">Total Amount:</span>
                <span className="font-bold text-green-400">${amount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <motion.div 
            className="flex items-start p-4 bg-yellow-900/30 border border-yellow-700 rounded-lg text-yellow-300"
            variants={itemVariants}
          >
            <AlertTriangle className="w-5 h-5 mr-3 mt-1 shrink-0" />
            <p className="text-xs">
              Ensure you have sufficient balance in your wallet. Transactions are final.
            </p>
          </motion.div>
        </motion.div>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4" variants={itemVariants}>
          <Button
            onClick={onCancel}
            variant="outline"
            className="w-full py-3 text-lg border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmPayment}
            className="w-full py-3 text-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Confirm Payment
          </Button>
        </motion.div>

        <motion.p className="text-center text-xs text-gray-500 mt-8" variants={itemVariants}>
          Secured by YourWallet™
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default WalletPayment;