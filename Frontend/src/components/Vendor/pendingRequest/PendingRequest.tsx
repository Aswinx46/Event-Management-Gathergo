import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function PendingRequest() {
  const navigate=useNavigate()
  const handleLogOut = () => {
    // Add logout logic here
    navigate(-1)
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
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
      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3,
        yoyo: Infinity,
      },
    },
  };

  return (
    <motion.div
      className="w-screen h-screen z-50 absolute backdrop-blur-xl top-0 right-0 flex items-center justify-center bg-gray-900/50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="w-[90vw] md:w-1/2 md:h-1/2 flex rounded-3xl justify-center items-center border-2 border-gray-700 bg-white/95 shadow-2xl p-6"
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex flex-col py-5 items-center gap-6 md:gap-8">
          <motion.h1
            className="text-2xl md:text-4xl font-bold text-gray-800"
            variants={itemVariants}
          >
            Account Activation Request
          </motion.h1>
          <motion.p
            className="text-gray-600 text-sm md:text-base font-medium"
            variants={itemVariants}
          >
            Your request is currently pending approval
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button
              asChild
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              <motion.button
                onClick={handleLogOut}
                variants={buttonVariants}
                whileHover="hover"
              >
                Log Out
              </motion.button>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default PendingRequest;