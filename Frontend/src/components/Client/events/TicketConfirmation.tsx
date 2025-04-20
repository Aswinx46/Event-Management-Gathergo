import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { format } from "date-fns";
import React from "react";
import { useNavigate } from "react-router-dom";

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

interface TicketConfirmationModalProps {
    ticket: TicketEntity;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const TicketConfirmationModal = ({ ticket, isOpen, setIsOpen }: TicketConfirmationModalProps) => {
    const navigate = useNavigate()
    return (
        <Dialog open={isOpen} onOpenChange={() => navigate('/')}>
            <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden bg-[#1A1F2C] rounded-2xl dark:border-none">
                <AnimatePresence>
                    <div className="relative">
                        {/* Success Banner */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-r from-gray-800 to-black p-6 text-white text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="w-16 h-16 bg-gray-900 rounded-full mx-auto mb-4 flex items-center justify-center"
                            >
                                <Check className="w-8 h-8 text-green-500" />
                            </motion.div>
                            <h2 className="text-2xl font-bold mb-2">Ticket Confirmed!</h2>
                            <p className="opacity-70">Your ticket has been successfully booked</p>
                        </motion.div>

                        {/* Ticket Details */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="p-6 bg-[#222226]"
                        >
                            {/* QR Code Section */}
                            <div className="mb-6 text-center">
                                <div className="bg-gray-900 p-4 rounded-lg inline-block">
                                    <img
                                        src={ticket.qrCodeLink}
                                        alt="Ticket QR Code"
                                        className="w-48 h-48 mx-auto object-contain"
                                    />
                                </div>
                                <p className="text-sm text-gray-500 mt-2">Scan to verify ticket</p>
                            </div>

                            {/* Ticket Information */}
                            <div className="space-y-4">
                                {[
                                    { label: "Ticket ID", value: ticket.ticketId },
                                    { label: "Amount", value: `$${ticket.totalAmount.toFixed(2)}` },
                                    { label: "Quantity", value: `${ticket.ticketCount} tickets` },
                                    {
                                        label: "Date",
                                        value: ticket.createdAt ? format(new Date(ticket.createdAt), 'MMM dd, yyyy') : '-'
                                    },
                                    {
                                        label: "Status",
                                        value: ticket.paymentStatus.charAt(0).toUpperCase() + ticket.paymentStatus.slice(1),
                                        className: ticket.paymentStatus === 'successful' ? 'text-green-500' :
                                            ticket.paymentStatus === 'failed' ? 'text-red-500' : 'text-yellow-500'
                                    }
                                ].map((item, index) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + (index * 0.1) }}
                                        className="flex items-center justify-between text-gray-300"
                                    >
                                        <span className="text-gray-500">{item.label}</span>
                                        <span className={`font-medium ${item.className || ''}`}>
                                            {item.value}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Contact Information */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                                className="mt-6 p-4 bg-gray-900 rounded-lg"
                            >
                                <h3 className="text-sm font-medium text-gray-400 mb-2">Contact Information</h3>
                                <div className="text-sm text-gray-500">
                                    <p>{ticket.email}</p>
                                    <p>{ticket.phone}</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
};
