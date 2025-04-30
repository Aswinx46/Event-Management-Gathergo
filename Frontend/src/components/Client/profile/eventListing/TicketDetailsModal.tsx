import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,

} from "@/components/ui/dialog";
import { TicketCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { TicketAndEventDTO } from "@/types/TicketAndEventDTO";


export interface TicketModalProps {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  ticket: TicketAndEventDTO;
}

const statusColor = {
  pending: "bg-yellow-100 text-yellow-800",
  successful: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
};

const ticketStatusColor = {
  used: "bg-green-100 text-green-800",
  unused: "bg-gray-100 text-gray-900",
  refunded: "bg-purple-100 text-purple-800",
};

const TicketModal: React.FC<TicketModalProps> = ({ open, setIsOpen, ticket }) => {

  if (!ticket) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && setIsOpen(false)}>
      {open && (
        <DialogContent className="max-w-md z-50 w-full bg-gradient-to-br from-white via-purple-50 to-purple-100 shadow-xl border-0 p-0 overflow-hidden">
          <AnimatePresence>
            <motion.div
              key="ticket-modal-anim z-40"
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.98 }}
              transition={{ type: "spring", damping: 21, stiffness: 180, duration: 0.35 }}
              className="relative"
            >
              <DialogHeader className="flex flex-col items-center pb-0 bg-gradient-to-r from-purple-100 via-purple-50 to-white border-b">
                <div className="flex w-full flex-row items-center justify-between">
                  <DialogTitle className="text-xl font-bold text-purple-800 flex items-center gap-1 pt-3 pl-6">
                    <TicketCheck className="w-5 h-5 text-purple-400" /> E-Ticket Details
                  </DialogTitle>

                </div>
              </DialogHeader>

              <div className="flex flex-col p-6 items-center">
                {/* QR Code with animation */}
                <motion.div
                  initial={{ scale: 0.86 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
                  className="shadow-lg rounded-lg bg-white p-4 mb-5"
                >
                  <img
                    src={ticket.qrCodeLink}
                    alt="QR Code"
                    className="h-32 w-32 object-contain"
                  />
                </motion.div>

                <div className="w-full space-y-2 mb-2">
                  {ticket._id && (
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">ID</span>
                      <span className="text-gray-600">{ticket._id}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-800">Ticket #</span>
                    <span className="text-blue-600 font-mono text-sm">{ticket.ticketId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-800">Tickets</span>
                    <span>{ticket.ticketCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-800">Total Paid</span>
                    <span className="font-semibold text-purple-700">${ticket.totalAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-800">Phone</span>
                    <span>{ticket.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-800">Email</span>
                    <span>{ticket.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-800">Payment</span>
                    <span className={`px-2 py-0.5 rounded ${statusColor[ticket.paymentStatus]} text-xs`}>
                      {ticket.paymentStatus.charAt(0).toUpperCase() + ticket.paymentStatus.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-800">Status</span>
                    <span className={`px-2 py-0.5 rounded ${ticketStatusColor[ticket.ticketStatus]} text-xs`}>
                      {ticket.ticketStatus.charAt(0).toUpperCase() + ticket.ticketStatus.slice(1)}
                    </span>
                  </div>
                </div>

                <DialogDescription className="text-xs text-gray-500 text-center mt-4">
                  Show this QR code at the event entrance to access your tickets! If you have any issues, please contact support.
                </DialogDescription>
              </div>
            </motion.div>
          </AnimatePresence>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default TicketModal;
