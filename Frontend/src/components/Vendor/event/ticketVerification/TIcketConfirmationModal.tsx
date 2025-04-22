
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { TicketCheck, Clock, Mail, Phone } from "lucide-react";
import { format } from "date-fns";

interface TicketEntity {
  _id?: string;
  ticketId: string;
  createdAt?: Date;
  totalAmount: number;
  ticketCount: number;
  phone: string;
  email: string;
  paymentStatus: 'pending' | 'successful' | 'failed';
  qrCodeLink: string;
  eventId: string;
  clientId: string;
  ticketStatus: 'used' | 'refunded' | 'unused';
  paymentTransactionId: string;
}

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: TicketEntity;
}

export const TicketModal = ({ isOpen, onClose, ticket }: TicketModalProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'successful':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'used':
        return 'bg-blue-100 text-blue-800';
      case 'refunded':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6"
            >
              <div className="flex flex-col space-y-6">
                {/* Header Section */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <TicketCheck className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold">Ticket Details</h2>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ticket.ticketStatus)}`}>
                    {ticket.ticketStatus.toUpperCase()}
                  </span>
                </motion.div>

                {/* Ticket Info Grid */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Ticket ID</p>
                    <p className="font-medium">{ticket.ticketId}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="font-medium">${ticket.totalAmount.toFixed(2)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Quantity</p>
                    <p className="font-medium">{ticket.ticketCount} tickets</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Payment Status</p>
                    <span className={`px-2 py-1 rounded-md text-sm font-medium ${getStatusColor(ticket.paymentStatus)}`}>
                      {ticket.paymentStatus.toUpperCase()}
                    </span>
                  </div>
                </motion.div>

                {/* Contact Information */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <p>{ticket.email}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <p>{ticket.phone}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Timestamp */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center space-x-2 text-sm text-gray-500"
                >
                  <Clock className="h-4 w-4" />
                  <p>Created: {ticket.createdAt ? format(new Date(ticket.createdAt), 'PPp') : 'N/A'}</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};