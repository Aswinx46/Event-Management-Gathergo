
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  positive?: boolean;
  delay?: number;
}

const StatCard = ({ title, value, icon, change, positive, delay = 0 }: StatCardProps) => {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay }}
      className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
          {change && (
            <p className={cn(
              "text-sm mt-2",
              positive ? "text-admin-success" : "text-admin-danger"
            )}>
              {positive ? '↑' : '↓'} {change}
            </p>
          )}
        </div>
        <div className="p-3 bg-admin-light rounded-lg">
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;