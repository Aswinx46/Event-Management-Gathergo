
import { motion } from 'framer-motion';
import { EventEntity } from '@/types/EventEntity';
import { formatTimeAgo, formatCurrency } from '@/utils/dateUtils';
import { Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RecentEventsProps {
  events: EventEntity[];
}

const RecentEvents = ({ events }: RecentEventsProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-lg border  border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold">Recent Events</h3>
        <Calendar className="h-5 w-5 text-admin-purple" />
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {events.slice(0, 3).map((event) => (
          <motion.div
            key={event._id?.toString()}
            variants={item}
            className="flex items-start space-x-4 border-b border-gray-100 pb-4 last:border-0"
          >
            <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
              <img
                src={event.posterImage[0]}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium">{event.title}</p>
              {event.schedule.map((item) => (
                <p className="text-sm text-gray-500">
                  {`${item.startTime} at ${event.venueName}`}
                </p>

              ))}
              <div className="flex items-center space-x-2 mt-1">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${event.status === 'upcoming' ? 'bg-green-100 text-green-800' :
                  event.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                  {event.status}
                </span>
                <span className="text-xs text-gray-500">
                  {formatTimeAgo(event.createdAt)}
                </span>
              </div>
            </div>
            <div className="ml-auto text-right">
              <p className="font-bold">{formatCurrency(event.pricePerTicket)}</p>
              <p className="text-sm text-gray-500">
                {event.ticketPurchased}/{event.totalTicket} tickets
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <div className="mt-4">
        <button onClick={() => navigate('/admin/events')} className="w-full py-2 text-admin-purple font-medium rounded-md border border-admin-purple hover:bg-admin-purple hover:text-white transition-colors">
          View All Events
        </button>
      </div>
    </div>
  );
};

export default RecentEvents;