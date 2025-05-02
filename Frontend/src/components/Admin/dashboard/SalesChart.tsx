/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign } from 'lucide-react';

interface SalesChartProps {
  data: {
    name: string;
    revenue: number;
    bookings: number;
  }[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded shadow-md border border-gray-100">
        <p className="text-sm font-medium mb-1">{label}</p>
        <p className="text-xs text-admin-purple">Revenue: ${payload[0].value}</p>
        <p className="text-xs text-admin-info">Bookings: {payload[1].value}</p>
      </div>
    );
  }

  return null;
};

const SalesChart = ({ data }: SalesChartProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Revenue & Bookings</h3>
        <DollarSign className="h-5 w-5 text-admin-purple" />
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" axisLine={false} tickLine={false} />
            <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stroke="#6E59A5"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
            <Line 
              yAxisId="right" 
              type="monotone" 
              dataKey="bookings" 
              stroke="#3B82F6" 
              strokeWidth={2} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SalesChart;