
import React from "react"
import { motion } from "framer-motion"

const LoadingScreen: React.FC = () => {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 z-50 flex items-center justify-center bg-black">
      <div className="relative flex flex-col items-center">
        {/* Minimalist loading animation */}
        <div className="relative w-24 h-24">
          {/* Rotating line */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-full h-px bg-white origin-left"
            style={{ translateY: "-50%" }}
            animate={{
              rotate: 360,
              backgroundColor: ["#ffffff", "#888888", "#ffffff"],
            }}
            transition={{
              rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              backgroundColor: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            }}
          />

          {/* Pulsing dot */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-white -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.8, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Circular track */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full rounded-full border border-zinc-800"
            animate={{
              borderColor: ["rgba(39, 39, 42, 0.3)", "rgba(39, 39, 42, 0.6)", "rgba(39, 39, 42, 0.3)"],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Simple text */}
        <motion.div
          className="mt-8 text-zinc-400 text-sm font-light tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Loading
        </motion.div>

        {/* Progress dots */}
        <div className="flex space-x-2 mt-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full bg-zinc-600"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default React.memo(LoadingScreen)

