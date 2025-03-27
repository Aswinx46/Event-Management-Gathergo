// EmptyTableMessage.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface EmptyTableMessageProps {
  message?: string; // Optional custom message
}

const EmptyTableMessage: React.FC<EmptyTableMessageProps> = ({ 
  message = "No user or vendor currently available"
}) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">No Data</h3>
        <p className="mt-1 text-gray-500">{message}</p>
      </div>
    </motion.div>
  );
};

export default EmptyTableMessage;