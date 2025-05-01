/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { EventEntity } from '../../../types/EventEntity';
import { 
  Calendar, 
  MapPin, 
  Clock, 

  Check,
  X
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface EventCardProps {
  event: EventEntity;
  // onEdit?: () => void;
  // onDelete?: () => void;
  // onCopyId?: () => void;
  onClick?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ 
  event,

  onClick
}) => {
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        duration: 0.3
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'upcoming':
        return <Calendar size={14} className="mr-1" />;
      case 'completed':
        return <Check size={14} className="mr-1" />;
      case 'cancelled':
        return <X size={14} className="mr-1" />;
      default:
        return null;
    }
  };

  return (
    <motion.div variants={item}>
      <Card 
        className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col cursor-pointer" 
        onClick={() => onClick && onClick()}
      >
        <div className="relative h-48 overflow-hidden">
          {event.posterImage && event.posterImage.length > 0 ? (
            <img 
              src={typeof event.posterImage[0] === 'string' ? event.posterImage[0] : URL.createObjectURL(event.posterImage[0] as File)} 
              alt={event.title}
              className="w-full h-full object-cover" 
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              No Image Available
            </div>
          )}
          <div className="absolute top-2 right-2">
            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
              {getStatusIcon(event.status)}
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </div>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{event.title}</h3>
          <div className="text-sm text-gray-500 mb-4 flex-grow">
            <div className="flex items-center mb-1">
              <Calendar size={16} className="mr-2" />
              {event.date && event.date.length > 0 ? 
                format(new Date(event.date[0]), 'PPP') : 
                'Date not specified'}
            </div>
            <div className="flex items-center mb-1">
              <Clock size={16} className="mr-2" />
              {format(new Date(event.startTime), 'p')} - {format(new Date(event.endTime), 'p')}
            </div>
            <div className="flex items-center">
              <MapPin size={16} className="mr-2" />
              <span className="line-clamp-1">{event.venueName || 'Location not specified'}</span>
            </div>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-2">
            <Badge variant="outline" className="flex justify-center">
              ${event.pricePerTicket}
            </Badge>
            <Badge variant="outline" className="flex justify-center">
              {event.ticketPurchased}/{event.totalTicket} sold
            </Badge>
          </div>
        </div>

        {/* <div className="p-5 pt-0 flex justify-between border-t mt-2" onClick={(e) => e.stopPropagation()}>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={(e) => {
              e.stopPropagation();
              onCopyId && onCopyId();
            }}
            className="text-xs hover:text-blue-600"
          >
            Copy ID
          </Button>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={(e) => {
                e.stopPropagation();
                onEdit && onEdit();
              }}
            >
              <Edit size={16} />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="text-red-600" 
              onClick={(e) => {
                e.stopPropagation();
                onDelete && onDelete();
              }}
            >
              <Trash size={16} />
            </Button>
          </div>
        </div> */}
      </Card>
    </motion.div>
  );
};
