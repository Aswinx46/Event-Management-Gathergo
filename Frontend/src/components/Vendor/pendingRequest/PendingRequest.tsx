import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function PendingRequest() {
  const navigate = useNavigate()
  const handleLogOut = () => {
    navigate(-1)
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="w-[90vw] max-w-2xl relative overflow-hidden rounded-3xl bg-white/95 shadow-2xl shadow-blue-500/10 p-12 border border-white/50"
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-blue-50/30 pointer-events-none" />
        
        <div className="relative flex flex-col items-center gap-8 text-center">
          {/* Icon */}
          <motion.div
            className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/10"
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            <svg
              className="w-12 h-12 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </motion.div>

          <div className="space-y-6">
            <motion.h1
              className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Account Activation Request
            </motion.h1>

            <motion.div
              className="space-y-4"
              variants={itemVariants}
            >
              <p className="text-lg text-gray-600">
                Your request is currently pending approval
              </p>
              
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mt-6 border border-blue-100/50">
                <div className="flex items-start space-x-3">
                  <svg 
                    className="w-6 h-6 text-blue-500 mt-0.5" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p className="text-blue-700">
                    Our admin team will review your request shortly. You'll be notified once your account is activated.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                onClick={handleLogOut}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl text-lg font-medium shadow-lg shadow-blue-500/20 transition-all duration-300"
              >
                <motion.span
                  variants={buttonVariants}
                  whileHover="hover"
                  className="flex items-center gap-2"
                >
                  <span>Return to Home</span>
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.span>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default PendingRequest;