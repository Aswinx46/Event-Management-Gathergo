import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CalendarDays,  User, Phone, Mail, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BookingDetailsInAdminEntity as Booking } from "@/types/BookingDetailsAdmin";
import { FaRupeeSign, FaTag } from "react-icons/fa";

interface BookingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

// const formatTime = (date: Date) => {
//   return date.toLocaleTimeString("en-US", {
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// };

const getStatusColor = (status: Booking["status"] | Booking["vendorApproval"] | Booking["paymentStatus"]) => {
  switch (status) {
    case "Completed":
    case "Approved":
    case "Successfull":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    case "Pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
    case "Cancelled":
    case "Rejected":
    case "Failed":
    case "Refunded":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
  }
};

const BookingDetailsModalAdmin: React.FC<BookingDetailsModalProps> = ({
  isOpen,
  onClose,
  booking,
}) => {
  // Add body scroll lock when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle ESC key press
  React.useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);



  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/25 backdrop-blur-sm"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
        >
          <motion.div
            className="relative w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl dark:bg-slate-800"
            role="dialog"
            aria-modal="true"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 z-10"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-600/20 dark:to-purple-600/20 px-6 py-4 border-b border-gray-100 dark:border-gray-700">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.2 } }}
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border border-gray-200 dark:border-gray-700">
                    <AvatarImage src={booking.clientId.profileImage} alt={booking.clientId.name} />
                    <AvatarFallback>{booking.clientId.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {booking.clientId.name}
                    </h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge className={getStatusColor(booking.status)}>
                        Status: {booking.status}
                      </Badge>
                      <Badge className={getStatusColor(booking.paymentStatus)}>
                        Payment: {booking.paymentStatus}
                      </Badge>
                      <Badge className={getStatusColor(booking.vendorApproval)}>
                        Vendor: {booking.vendorApproval}
                      </Badge>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Content */}
            <motion.div
              className="px-6 py-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
            >
              <div className="space-y-4">
                <div className="flex items-start">
                  <CalendarDays className="w-5 h-5 mt-0.5 mr-3 text-indigo-500 dark:text-indigo-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                    <p className="text-gray-900 dark:text-white">
                      {formatDate(new Date(booking.date[0]))}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                <FaTag className="w-5 h-5 mt-0.5 mr-3 text-indigo-500 dark:text-indigo-400" />

                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Service Title</p>
                    <p className="text-gray-900 dark:text-white">
                      {booking.serviceId.title}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaRupeeSign className="w-5 h-5 mt-0.5 mr-3 text-indigo-500 dark:text-indigo-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Service Price</p>
                    <p className="text-gray-900 dark:text-white">
                      {booking.serviceId.servicePrice}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <User className="w-5 h-5 mt-0.5 mr-3 text-indigo-500 dark:text-indigo-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Vendor</p>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={booking.vendorId.profileImage} alt={booking.vendorId.name} />
                        <AvatarFallback>{booking.vendorId.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <p className="text-gray-900 dark:text-white">{booking.vendorId.name}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-5 h-5 mt-0.5 mr-3 text-indigo-500 dark:text-indigo-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-gray-900 dark:text-white">{booking.email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-5 h-5 mt-0.5 mr-3 text-indigo-500 dark:text-indigo-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="text-gray-900 dark:text-white">{booking.phone}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CreditCard className="w-5 h-5 mt-0.5 mr-3 text-indigo-500 dark:text-indigo-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Payment Status</p>
                    <Badge className={getStatusColor(booking.paymentStatus)}>
                      {booking.paymentStatus}
                    </Badge>
                  </div>
                </div>

                {booking.rejectionReason && (
                  <div className="pt-2">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Rejection Reason</p>
                    <p className="text-gray-700 dark:text-gray-300">{booking.rejectionReason}</p>
                  </div>
                )}

                <div className="pt-2">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Booking Created</p>
                  <p className="text-gray-700 dark:text-gray-300">{formatDate(new Date(booking.createdAt))}</p>
                </div>
              </div>
            </motion.div>

            {/* Footer */}
            <motion.footer
              className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-800/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.4 } }}
            >
              {booking.status !== "Cancelled" && booking.status !== "Completed" && (
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  Cancel Booking
                </Button>
              )}
              <Button
                onClick={onClose}
                className="bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-600 dark:hover:bg-indigo-700"
              >
                Close
              </Button>
            </motion.footer>
          </motion.div>
        </motion.div>
      )}
      
    </AnimatePresence>
  );
};

export default BookingDetailsModalAdmin;
