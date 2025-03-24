import React from "react";
import { motion } from "framer-motion";

// Animation variants for the container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

// Animation variants for the loading text
const textVariants = {
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

// Animation for the spinner
const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: "linear",
    },
  },
};

// Animation for the background gradient
const backgroundVariants = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      repeat: Infinity,
      duration: 10,
      ease: "linear",
    },
  },
};

const LoadingScreen: React.FC = () => {
  return (
    <motion.div
      className="w-screen h-screen fixed top-0 left-0 z-50 flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
      variants={containerVariants}
      initial="hidden"
    //   animate="visible"
      exit="exit"
      style={{
        backgroundSize: "200% 200%",
      }}
      {...backgroundVariants}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Spinner */}
        <motion.div
          className="w-16 h-16 border-4 border-t-transparent border-white rounded-full"
          variants={spinnerVariants}
          animate="animate"
        />

        {/* Loading Text */}
        <motion.h1
          className="text-2xl md:text-3xl font-semibold text-white"
          variants={textVariants}
        >
          Loading...
        </motion.h1>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;