/* eslint-disable @typescript-eslint/no-unused-vars */

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  formatter?: (value: number) => string;
  percentageChange?: number;
}

const StatCard = ({ title, value, icon: Icon, color, formatter, percentageChange }: StatCardProps) => {
  const displayValue = formatter ? formatter(value) : value.toString();
  const isPositiveChange = percentageChange && percentageChange > 0;
  
  return (
    <motion.div 
      className={`relative overflow-hidden rounded-xl bg-white shadow-lg`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <motion.p 
              className="text-sm font-medium text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {title}
            </motion.p>
            <motion.div 
              className="mt-2 text-3xl font-bold tracking-tight text-gray-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <AnimatedCounter 
                from={0} 
                to={value} 
                formatter={formatter || ((val) => Math.floor(val).toString())} 
              />
            </motion.div>
            
            {percentageChange !== undefined && (
              <motion.div
                className={`mt-2 text-sm font-medium flex items-center ${isPositiveChange ? 'text-emerald-600' : 'text-rose-600'}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className={`mr-1 ${isPositiveChange ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {isPositiveChange ? '↑' : '↓'}
                </span>
                {Math.abs(percentageChange).toFixed(1)}%
              </motion.div>
            )}
          </div>
          <motion.div 
            className={`rounded-full p-3 ${color}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.4
            }}
          >
            <Icon className="h-6 w-6 text-white" />
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </motion.div>
  );
};

export default StatCard;