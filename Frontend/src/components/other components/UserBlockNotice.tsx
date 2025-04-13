import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlockedScreen = () => {
  // Variants for container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
        delay: 0.2,
      },
    },
  };

  // Variants for child elements animations
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  // Floating animation for the warning icon
  const floatingAnimation = {
    y: ["-5px", "5px", "-5px"],
    transition: {
      repeat: Infinity,
      duration: 3,
      ease: "easeInOut",
    },
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <motion.div
        className="max-w-md w-full p-8 rounded-xl bg-zinc-900 border border-purple-900/30 shadow-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="flex justify-center mb-6"
          animate={floatingAnimation}
        >
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-white"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
            </svg>
          </div>
        </motion.div>
        
        <motion.h1 
          className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text"
          variants={itemVariants}
        >
          Account Blocked
        </motion.h1>
        
        <motion.p 
          className="text-gray-300 text-center mb-8"
          variants={itemVariants}
        >
          Your account has been blocked by the administrator. Please contact the admin for more information.
        </motion.p>
        
        <motion.div 
          className="bg-zinc-800/50 p-4 rounded-lg mb-6 border border-zinc-700"
          variants={itemVariants}
        >
          <h2 className="text-sm font-medium text-gray-400 mb-2">Contact Information</h2>
          <p className="text-white font-medium">admin@company.com</p>
        </motion.div>
        
        <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
          <Button 
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 flex items-center justify-center gap-2 h-12"
          >
            <Mail size={18} />
            Contact Administrator
          </Button>
        </motion.div>
      </motion.div>
      
      <motion.p 
        className="mt-6 text-zinc-600 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        Reference ID: BLK-2025-04132
      </motion.p>
    </div>
  );
};

export default BlockedScreen;
