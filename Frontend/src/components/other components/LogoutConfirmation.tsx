import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LogoutConfirmationProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutConfirmation: React.FC<LogoutConfirmationProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
          />
          
          <motion.div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <div className="bg-black border border-gray-800 rounded-lg shadow-xl overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <h2 className="text-lg font-medium text-white">Confirm Logout</h2>
                <button
                  onClick={onCancel}
                  className="p-1 rounded-full hover:bg-gray-800 transition-colors focus:outline-none"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>
              
              <div className="p-6">
                <p className="text-gray-300 mb-6">
                  Are you sure you want to log out of your account?
                </p>
                
                <div className="flex space-x-3 justify-end">
                  <Button
                    variant="outline"
                    onClick={onCancel}
                    className="border-gray-700 text-white hover:bg-gray-800 hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={onConfirm}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LogoutConfirmation;
