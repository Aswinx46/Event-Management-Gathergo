import React from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wallet, CreditCard } from 'lucide-react';

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPaymentMethod: (method: 'wallet' | 'stripe') => void;
  
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2, ease: "easeIn" } },
};

const optionVariants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 },
};

const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({ isOpen, onClose, onSelectPaymentMethod }) => {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="p-0 sm:max-w-[480px] overflow-hidden border-none rounded-lg shadow-2xl bg-background">
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-2xl font-semibold text-center text-foreground">Choose Payment Method</DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              Select your preferred way to complete the transaction.
            </DialogDescription>
          </DialogHeader>
          
          <div className="p-6 pt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              variants={optionVariants}
              whileHover="hover"
              whileTap="tap"
              className="cursor-pointer p-6 border rounded-lg flex flex-col items-center justify-center space-y-3 hover:bg-accent hover:border-primary transition-colors duration-200"
              onClick={() => onSelectPaymentMethod('wallet')}
            >
              <Wallet className="w-12 h-12 text-primary" />
              <span className="text-lg font-medium text-foreground">Wallet Payment</span>
              <p className="text-xs text-muted-foreground text-center">Use your existing wallet balance.</p>
            </motion.div>

            <motion.div
              variants={optionVariants}
              whileHover="hover"
              whileTap="tap"
              className="cursor-pointer p-6 border rounded-lg flex flex-col items-center justify-center space-y-3 hover:bg-accent hover:border-primary transition-colors duration-200"
              onClick={() => onSelectPaymentMethod('stripe')}
            >
              <CreditCard className="w-12 h-12 text-primary" />
              <span className="text-lg font-medium text-foreground">Stripe Payment</span>
              <p className="text-xs text-muted-foreground text-center">Pay securely with your card via Stripe.</p>
            </motion.div>
          </div>

          <div className="p-6 pt-0 flex justify-center">
            <DialogClose asChild>
              <Button variant="outline" onClick={onClose} className="w-full md:w-auto">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentMethodModal;