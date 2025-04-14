
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);
  const redirect=location.pathname.split('/')[1]
  console.log(location.pathname)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 50 
      }
    }
  };

  // Stars animation
  const generateStars = (count: number) => {
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 3 + 1;
      const animationDuration = Math.random() * 5 + 3;
      
      return (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            width: size,
            height: size,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: animationDuration,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      );
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-purple-900 via-blue-900 to-black flex items-center justify-center">
      {/* Background stars */}
      <div className="absolute inset-0 z-0">
        {generateStars(100)}
      </div>
      
      {/* Content container */}
      <motion.div 
        className="relative z-10 text-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Floating astronaut */}
        <motion.div
          className="mx-auto mb-8 w-48 h-48 relative"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path 
              d="M100 180C100 180 155 150 155 100C155 50 100 20 100 20C100 20 45 50 45 100C45 150 100 180 100 180Z" 
              fill="#9b87f5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.circle 
              cx="100" 
              cy="90" 
              r="40" 
              fill="white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 1 }}
            />
            <motion.circle 
              cx="100" 
              cy="90" 
              r="35" 
              fill="#1A1F2C"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            />
            <motion.path 
              d="M90 85C90 85 95 80 100 85C105 90 110 85 110 85" 
              stroke="white" 
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 2, duration: 1 }}
            />
          </svg>
        </motion.div>
        
        {/* 404 text */}
        <motion.h1 
          className="text-8xl font-bold text-white mb-4 tracking-wider"
          variants={itemVariants}
        >
          4<span className="text-purple-400">0</span>4
        </motion.h1>
        
        {/* Description */}
        <motion.p 
          className="text-xl text-purple-200 mb-8 max-w-md mx-auto"
          variants={itemVariants}
        >
          Houston, we have a problem! The page you're looking for has drifted into deep space.
        </motion.p>
        
        {/* Back button */}
        <motion.div variants={itemVariants}>
          <Button
            variant="outline"
            className="bg-transparent border-2 border-purple-400 text-purple-200 hover:bg-purple-900 hover:text-white py-2 px-6 rounded-full font-medium transition-all duration-300 text-lg group"
            asChild
          >
            <motion.a 
              href={`/${redirect}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Return to Home</span>
              <motion.span 
                className="inline-block ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
          </Button>
        </motion.div>
        
        {/* Mouse trailer effect */}
        <motion.div
          className="hidden md:block absolute w-40 h-40 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-xl pointer-events-none"
          animate={{
            x: 0,
            y: 0,
          }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 100,
            restDelta: 0.001
          }}
          style={{
            x: "-50%",
            y: "-50%"
          }}
        />
      </motion.div>
    </div>
  );
};

export default NotFound;