// import { motion, AnimatePresence } from "framer-motion";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { Check } from "lucide-react";
// import { format } from "date-fns";
// import React from "react";
// import { useNavigate } from "react-router-dom";

// interface TicketEntity {
//     _id?: string;
//     ticketId: string;
//     createdAt?: Date;
//     totalAmount: number;
//     ticketCount: number;
//     phone: string;
//     email: string;
//     paymentStatus: 'pending' | 'successful' | 'failed';
//     qrCodeLink: string;
//     eventId: string;
//     clientId: string;
//     ticketStatus: 'used' | 'refunded' | 'unused';
//     paymentTransactionId: string;
// }

// interface TicketConfirmationModalProps {
//     ticket: TicketEntity;
//     isOpen: boolean;
//     setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
// }

// export const TicketConfirmationModal = ({ ticket, isOpen }: TicketConfirmationModalProps) => {
//     const navigate = useNavigate()

//     return (
//         <Dialog open={isOpen} onOpenChange={() => navigate('/')}>
//             <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden bg-[#1A1F2C] rounded-2xl dark:border-none">
//                 <AnimatePresence>
//                     <div className="relative">
//                         {/* Success Banner */}
//                         <motion.div
//                             initial={{ opacity: 0, y: -20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             className="bg-gradient-to-r from-gray-800 to-black p-6 text-white text-center"
//                         >
//                             <motion.div
//                                 initial={{ scale: 0 }}
//                                 animate={{ scale: 1 }}
//                                 transition={{ delay: 0.2 }}
//                                 className="w-16 h-16 bg-gray-900 rounded-full mx-auto mb-4 flex items-center justify-center"
//                             >
//                                 <Check className="w-8 h-8 text-green-500" />
//                             </motion.div>
//                             <h2 className="text-2xl font-bold mb-2">Ticket Confirmed!</h2>
//                             <p className="opacity-70">Your ticket has been successfully booked</p>
//                         </motion.div>

//                         {/* Ticket Details */}
//                         <motion.div
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 0.3 }}
//                             className="p-6 bg-[#222226]"
//                         >
//                             {/* QR Code Section */}
//                             <div className="mb-6 text-center">
//                                 <div className="bg-gray-900 p-4 rounded-lg inline-block">
//                                     <img
//                                         src={ticket.qrCodeLink}
//                                         alt="Ticket QR Code"
//                                         className="w-48 h-48 mx-auto object-contain"
//                                     />
//                                 </div>
//                                 <p className="text-sm text-gray-500 mt-2">Scan to verify ticket</p>
//                             </div>

//                             {/* Ticket Information */}
//                             <div className="space-y-4">
//                                 {[
//                                     { label: "Ticket ID", value: ticket.ticketId },
//                                     { label: "Amount", value: `$${ticket.totalAmount.toFixed(2)}` },
//                                     { label: "Quantity", value: `${ticket.ticketCount} tickets` },
//                                     {
//                                         label: "BookingDate",
//                                         value: ticket.createdAt ? format(new Date(ticket.createdAt), 'MMM dd, yyyy') : '-'
//                                     },
//                                     {
//                                         label: "PaymentStatus",
//                                         value: ticket.paymentStatus.charAt(0).toUpperCase() + ticket.paymentStatus.slice(1),
//                                         className: ticket.paymentStatus === 'successful' ? 'text-green-500' :
//                                             ticket.paymentStatus === 'failed' ? 'text-red-500' : 'text-yellow-500'
//                                     }
//                                 ].map((item, index) => (
//                                     <motion.div
//                                         key={item.label}
//                                         initial={{ opacity: 0, x: -20 }}
//                                         animate={{ opacity: 1, x: 0 }}
//                                         transition={{ delay: 0.4 + (index * 0.1) }}
//                                         className="flex items-center justify-between text-gray-300"
//                                     >
//                                         <span className="text-gray-500">{item.label}</span>
//                                         <span className={`font-medium ${item.className || ''}`}>
//                                             {item.value}
//                                         </span>
//                                     </motion.div>
//                                 ))}
//                             </div>

//                             {/* Contact Information */}
//                             <motion.div
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ delay: 0.9 }}
//                                 className="mt-6 p-4 bg-gray-900 rounded-lg"
//                             >
//                                 <h3 className="text-sm font-medium text-gray-400 mb-2">Contact Information</h3>
//                                 <div className="text-sm text-gray-500">
//                                     <p>{ticket.email}</p>
//                                     <p>{ticket.phone}</p>
//                                 </div>
//                             </motion.div>
//                         </motion.div>
//                     </div>
//                 </AnimatePresence>
//             </DialogContent>
//         </Dialog>
//     );
// };

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TicketBookingSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const TicketBookingSuccessModal: React.FC<TicketBookingSuccessModalProps> = ({
    isOpen,
    onClose,
}) => {
    const navigate = useNavigate()
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
                        >
                            {/* Header */}
                            <div className="relative bg-gradient-to-r from-green-400 to-emerald-500 px-6 py-8 text-center">
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                                >
                                    <X size={24} />
                                </button>

                                {/* Success Icon with Animation */}
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.2, type: "spring", duration: 0.6 }}
                                    className="mb-4"
                                >
                                    <div className="bg-white/20 rounded-full p-3 inline-block">
                                        <CheckCircle size={48} className="text-white" />
                                    </div>
                                </motion.div>

                                {/* Title with stagger animation */}
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    className="text-2xl font-bold text-white mb-2"
                                >
                                    Booking Successful!
                                </motion.h2>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                    className="text-white/90 text-sm"
                                >
                                    Your ticket has been confirmed
                                </motion.p>
                            </div>

                            {/* Body */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="p-6"
                            >
                                <div className="text-center mb-6">
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Great news! Your ticket booking has been processed successfully.
                                        You can view all your booking details and manage your tickets in your profile.
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col gap-3">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => navigate('/profile/bookedEvents')}
                                        className="bg-gradient-to-r from-green-400 to-emerald-500 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-all hover:shadow-lg"
                                    >
                                        <User size={18} />
                                        Check Your Profile
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={onClose}
                                        className="bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium transition-all hover:bg-gray-200"
                                    >
                                        Continue Browsing
                                    </motion.button>
                                </div>
                            </motion.div>

                            {/* Decorative Elements */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-green-400"></div>
                        </motion.div>
                    </motion.div>

                    {/* Confetti Animation */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 pointer-events-none z-40"
                    >
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{
                                    y: -100,
                                    x: Math.random() * window.innerWidth,
                                    rotate: 0,
                                    scale: 0
                                }}
                                animate={{
                                    y: window.innerHeight + 100,
                                    rotate: 360,
                                    scale: 1
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    delay: Math.random() * 0.5,
                                    ease: "easeOut"
                                }}
                                className={`absolute w-3 h-3 ${i % 4 === 0 ? 'bg-green-400' :
                                    i % 4 === 1 ? 'bg-emerald-500' :
                                        i % 4 === 2 ? 'bg-yellow-400' : 'bg-blue-400'
                                    } rounded-full`}
                            />
                        ))}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

// export default TicketBookingSuccessModal;
