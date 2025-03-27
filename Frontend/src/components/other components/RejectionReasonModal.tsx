// VendorRejectionModal.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { X } from 'lucide-react';

interface VendorRejectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  setRejectionReason: React.Dispatch<React.SetStateAction<string>>,
  rejectionReason:string
}

const VendorRejectionModal: React.FC<VendorRejectionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  setRejectionReason,
  rejectionReason

}) => {
  const [reason, setReason] = useState('');

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2 }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.15 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0  bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div
            className="fixed inset-0 flex flex-col items-center justify-center z-50 p-4"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="bg-white  rounded-lg shadow-xl w-full max-w-md p-3">
              <X className='flex justify-self-end pb-2' onClick={onClose}></X>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
                placeholder="Enter rejection reason..."
              />
              <div className="flex justify-end mt-4">
                <Button onClick={onSubmit}>SUBMIT</Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default VendorRejectionModal;