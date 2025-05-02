// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { motion } from 'framer-motion';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
// import { Calendar } from 'lucide-react';

// interface EventChartProps {
//   events: {
//     title: string;
//     ticketPurchased: number;
//   }[];
// }

// const colors = ['#6E59A5', '#9b87f5', '#8E9196', '#F59E0B', '#10B981'];

// const CustomTooltip = ({ active, payload, label }: any) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-white p-3 rounded shadow-md border border-gray-100">
//         <p className="text-sm font-medium">{`${label}: ${payload[0].value}`}</p>
//       </div>
//     );
//   }

//   return null;
// };

// const EventChart = ({ events }: EventChartProps) => {
//   console.log('events in child',events)
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
//     >
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-lg font-bold">Events by Category</h3>
//         <Calendar className="h-5 w-5 text-admin-purple" />
//       </div>
//       <div className="h-64">
//       <ResponsiveContainer width="100%" height="100%">
//   <BarChart
//     data={events}
//     margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
//   >
//     <XAxis dataKey="title" type="category" axisLine={false} tickLine={false} />
//     <YAxis type="number" />
//     <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
//     <Bar dataKey="ticketPurchased" barSize={30} radius={[4, 4, 0, 0]}>
//       {events.map((entry, index) => (
//         <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
//       ))}
//     </Bar>
//   </BarChart>
// </ResponsiveContainer>



//       </div>
//     </motion.div>
//   );
// };

// export default EventChart;

import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Title } from 'chart.js';
import { CalendarDays } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title);

interface EventChartProps {
  events: {
    title: string;
    ticketPurchased: number;
  }[];
}

const colors = ['#6E59A5', '#9b87f5', '#8E9196', '#F59E0B', '#10B981'];

const EventChart = ({ events }: EventChartProps) => {
  const data = {
    labels: events.map(event => event.title),
    datasets: [
      {
        label: 'Tickets Purchased',
        data: events.map(event => event.ticketPurchased),
        backgroundColor: events.map((_, idx) => colors[idx % colors.length]),
        borderRadius: 15,
        barThickness: 70,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: any) => `${ctx.parsed.y} tickets`,
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#6B7280',
          maxRotation: 45,
          minRotation: 20,
          font: { size: 12 },
        },
        grid: { display: false },
      },
      y: {
        ticks: {
          color: '#6B7280',
          font: { size: 12 },
        },
        grid: { color: '#E5E7EB' },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 w-full"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Tickets Sold per Event</h2>
          <p className="text-sm text-gray-500">Top selling events by ticket count</p>
        </div>
        <CalendarDays className="h-6 w-6 text-purple-600" />
      </div>
  
      {/* Chart Container */}
      <div className="w-full h-[400px]">
        <Bar data={data} options={options} style={{ width: '100%', height: '100%' }} />
      </div>
    </motion.div>
  );
};

export default EventChart;
