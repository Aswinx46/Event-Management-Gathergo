import React from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Calendar,
    Clock,
    Mail,
    Phone,
    CreditCard,
   
} from "lucide-react";

// Define interfaces for our data structure
// interface Vendor {
//     _id: string;
//     name: string;
//     email: string;
//     phone: number;
//     profileImage: string;
// }

// interface BookingDetails {
//     _id: string;
//     date: string;
//     email: string;
//     paymentStatus: "Pending" | "Paid" | "Cancelled";
//     phone: number;
//     serviceDescription: string;
//     serviceDuration: string;
//     servicePrice: number;
//     serviceTitle: string;
//     status: "Pending" | "Confirmed" | "Cancelled" | "Completed";
//     vendor: Vendor;
// }

interface Service {
    serviceTitle: string;
    serviceDescription: string;
    serviceDuration: string;
    servicePrice: number;
  }
  
  interface Vendor {
    _id: string;
    name: string;
    email: string;
    phone: number;
    profileImage: string;
  }
  
  export interface BookingDetails {
    _id: string;
    date: string;
    email: string;
    phone: number;
    paymentStatus: string;
    status: string;
    service: Service;
    vendor: Vendor;
  }
  

interface BookingDetailsModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    booking: BookingDetails | null;
}

// Helper function to format currency
// const formatCurrency = (amount: number): string => {
//   return new Intl.NumberFormatOptions("en-US", {
//     style: "currency",
//     currency: "USD",
//   }).format(amount);
// };

// Helper function to format phone number
const formatPhoneNumber = (phone: number): string => {
    const phoneString = phone.toString();
    if (phoneString.length === 10) {
        return `(${phoneString.slice(0, 3)}) ${phoneString.slice(3, 6)}-${phoneString.slice(6)}`;
    }
    return phoneString;
};

// Helper function to get status badge style
const getStatusStyle = (status: BookingDetails["status"] | BookingDetails["paymentStatus"]) => {
    switch (status) {
        case "Confirmed":
            return "bg-gray-700 text-white";
        case "Pending":
            return "bg-gray-500 text-white";
        case "Completed":
            return "bg-black text-white";
        case "Paid":
            return "bg-black text-white";
        case "Cancelled":
            return "bg-gray-300 text-black";
        default:
            return "bg-gray-100 text-black";
    }
};

const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({
    isOpen,
    setIsOpen,
    booking
}) => {
    if (!booking) return null;

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.4 }
        }
    };

    const bookingDate = new Date(booking.date);
    const timeAgo = formatDistanceToNow(bookingDate, { addSuffix: true });

    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
            <DialogContent className="max-w-md bg-gray-900 border border-gray-800 text-white p-0 rounded-xl overflow-hidden">
                <DialogHeader className="bg-black py-6 px-5">
                    <DialogTitle className="text-xl font-bold flex items-center justify-between">
                        <span>Booking Details</span>
                        <span className={`text-xs px-3 py-1 rounded-full ${getStatusStyle(booking.status)}`}>
                            {booking.status}
                        </span>
                    </DialogTitle>
                </DialogHeader>
                <motion.div
                    className="p-6 space-y-5"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {/* Service Details */}
                    <motion.div variants={itemVariants} className="space-y-1">
                        <h3 className="text-lg font-bold text-white">{booking.service.serviceTitle}</h3>
                        <p className="text-gray-400 text-sm">{booking.service.serviceDescription}</p>
                    </motion.div>

                    {/* Date and Time */}
                    <motion.div variants={itemVariants} className="bg-gray-800 p-4 rounded-lg">
                        <div className="flex items-start gap-3">
                            <Calendar className="h-5 w-5 text-gray-400 mt-1" />
                            <div>
                                <p className="text-white">{bookingDate.toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</p>
                                <p className="text-gray-400 text-sm">{timeAgo}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 mt-3">
                            <Clock className="h-5 w-5 text-gray-400" />
                            <p className="text-white">{booking.service.serviceDuration}</p>
                        </div>
                    </motion.div>

                    {/* Vendor Info */}
                    <motion.div variants={itemVariants} className="border border-gray-800 rounded-lg p-4 flex items-center gap-4">
                        {booking.vendor.profileImage && (
                            <img
                                src={booking.vendor.profileImage}
                                alt={booking.vendor.name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                        )}
                        <div>
                            <p className="text-white font-medium">{booking.vendor.name}</p>
                            <p className="text-gray-400 text-sm">{booking.vendor.email}</p>
                            <p className="text-gray-400 text-sm">{formatPhoneNumber(booking.vendor.phone)}</p>
                        </div>
                    </motion.div>

                    {/* Customer Info */}
                    <motion.div variants={itemVariants} className="space-y-3">
                        <h3 className="text-sm font-medium text-gray-400">Your Contact Information</h3>
                        <div className="grid grid-cols-1 gap-3">
                            <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-gray-500" />
                                <p className="text-white">{booking.email}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-gray-500" />
                                <p className="text-white">{formatPhoneNumber(booking.phone)}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Payment Details */}
                    <motion.div variants={itemVariants} className="flex justify-between items-center border-t border-gray-800 pt-4 mt-4">
                        <div className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5 text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-400">Payment Status</p>
                                <span className={`text-xs px-2 py-0.5 rounded-full inline-block mt-1 ${getStatusStyle(booking.paymentStatus)}`}>
                                    {booking.paymentStatus}
                                </span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-400">Total Amount</p>
                            <p className="text-xl font-bold text-white">${booking.service.servicePrice.toLocaleString()}</p>
                        </div>
                    </motion.div>

                    {/* Booking ID */}
                    <motion.div variants={itemVariants} className="text-center pt-2 border-t border-gray-800">
                        <p className="text-xs text-gray-500">Booking ID: {booking._id}</p>
                    </motion.div>
                </motion.div>

                <DialogFooter className="bg-gray-900 p-4 border-t border-gray-800">
                    <Button
                        onClick={() => setIsOpen(false)}
                        className="w-full bg-black hover:bg-gray-800 text-white border border-gray-800"
                    >
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default BookingDetailsModal;