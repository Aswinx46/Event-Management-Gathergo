
import React from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = "Loading" }) => {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="relative flex flex-col items-center justify-center">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-full blur-3xl opacity-30" />
        
        {/* Main loading spinner */}
        <motion.div
          className="relative w-24 h-24 mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full border-t-2 border-r-2 border-white/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-t-2 border-l-2 border-white/20"
            animate={{ rotate: -360 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Center dot */}
          <motion.div 
            className="absolute inset-0 m-auto w-3 h-3 bg-white rounded-full"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
          
          {/* Pulsing rings */}
          <motion.div
            className="absolute inset-0 rounded-full border border-white/5"
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/10"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
        </motion.div>

        {/* Loading text */}
        <motion.div 
          className="text-white text-xl font-light tracking-wider"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.span 
            className="relative inline-block"
          >
            {message}
            <motion.span 
              className="absolute -right-6"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              ...
            </motion.span>
          </motion.span>
        </motion.div>
      </div>
      
      {/* Footer text with subtle fade-in */}
      <motion.p 
        className="absolute bottom-10 text-gray-500 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        Please wait while we prepare your experience
      </motion.p>
    </div>
  );
};

export default LoadingScreen;