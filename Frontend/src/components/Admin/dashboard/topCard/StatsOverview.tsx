
import { motion } from "framer-motion";
import { Users, Briefcase, Calendar, DollarSign } from "lucide-react";
import StatCard from "./StatCard";

interface StatsOverviewProps {
  vendors: number;
  bookings: number;
  revenue: number;
  clients: number;
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
};

export const StatsOverview = ({ 
  vendors = 0, 
  bookings = 0, 
  revenue = 0, 
  clients = 0 
}: StatsOverviewProps) => {
  return (
    <motion.div 
      className="w-full px-7"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="text-2xl font-bold mb-6 text-gray-800"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Business Overview
      </motion.h2>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Vendors"
          value={vendors}
          icon={Briefcase}
          color="bg-gradient-to-br from-violet-500 to-purple-700"
          percentageChange={8.4}
        />
        
        <StatCard
          title="Total Bookings"
          value={bookings}
          icon={Calendar}
          color="bg-gradient-to-br from-sky-400 to-indigo-500"
          percentageChange={12.7}
        />
        
        <StatCard
          title="Total Revenue"
          value={revenue}
          icon={DollarSign}
          color="bg-gradient-to-br from-teal-400 to-emerald-600"
          formatter={formatCurrency}
          percentageChange={15.2}
        />
        
        <StatCard
          title="Total Clients"
          value={clients}
          icon={Users}
          color="bg-gradient-to-br from-orange-400 to-pink-600"
          percentageChange={-3.5}
        />
      </div>
    </motion.div>
  );
};

