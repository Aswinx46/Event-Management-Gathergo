import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, MessageSquare, User, Clock } from "lucide-react";

interface BookingConfirmationProps {
  isOpen: boolean;
  setIsOpen:React.Dispatch<React.SetStateAction<boolean>>
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const handleViewBookings = () => {
    // Simply close the modal without showing toast
    setIsOpen(false)
    // In a real application, this would navigate to the bookings page
    console.log("Navigating to bookings page");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white p-6 rounded-2xl shadow-lg max-w-md w-full"
          >
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="bg-black rounded-full p-3 mb-6"
              >
                <Check className="w-8 h-8 text-white" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold mb-2 text-black"
              >
                Request Sent Successfully
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 mb-6"
              >
                Your service booking request has been sent to the vendor.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gray-50 p-4 rounded-xl mb-6 w-full"
              >
                <div className="flex flex-col gap-3 text-left">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      Waiting for vendor approval
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      You can chat with the vendor once approved
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      Check status in your profile Bookings section
                    </span>
                  </div>
                </div>
              </motion.div>

              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Button
                  variant="outline"
                  className="flex-1 bg-white text-black border-gray-300 hover:bg-gray-100 hover:text-black"
                  onClick={()=>setIsOpen(false)}
                >
                  Close
                </Button>
                <Button
                  className="flex-1 bg-black text-white hover:bg-gray-800"
                  onClick={handleViewBookings}
                >
                  View Bookings
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingConfirmation;