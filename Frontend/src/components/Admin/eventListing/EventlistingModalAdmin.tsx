
import React from 'react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { EventEntity } from '../../../types/EventEntity';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  MapPin,
  Clock,
  Tag,
  Users,
  DollarSign,
  Check,
  X,
  User,
} from 'lucide-react';
import { CloudinaryPreset } from '@/utils/cloudinaryPresetFile';

interface EventDetailsModalProps {
  event: EventEntity | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (event: EventEntity) => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  event,
  isOpen,
  onClose,
}) => {
  if (!event) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-scroll rounded-xl bg-white h-3/4 hide-scrollbar">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col md:flex-col "
          >
            {/* Event Image Section */}
            <div className="relative h-64 md:h-auto">
              {event.posterImage && event.posterImage.length > 0 ? (
                <motion.img
                  src={typeof event.posterImage[0] === 'string' ? CloudinaryPreset+event.posterImage[0] : URL.createObjectURL(event.posterImage[0] as File)}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  No Image Available
                </div>
              )}
              <div className="absolute top-4 left-4">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium shadow-sm ${getStatusColor(event.status)}`}>
                  {event.status === 'upcoming' && <Calendar size={14} className="mr-1" />}
                  {event.status === 'completed' && <Check size={14} className="mr-1" />}
                  {event.status === 'cancelled' && <X size={14} className="mr-1" />}
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </div>
              </div>
            </div>

            {/* Event Details Section */}
            <div className=" flex flex-col p-6  md:overflow-y-auto bg-white">
              <DialogHeader className="mb-4">
                <DialogTitle className="text-2xl font-bold text-gray-800">{event.title}</DialogTitle>
                <p className="text-sm text-gray-500 mt-1">Event ID: {event._id}</p>
              </DialogHeader>

              <div className="space-y-6 flex-grow">
                {/* Description */}
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-gray-800">Description</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
                </div>

                {/* Event Details */}
                <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-800">Event Details</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <Calendar className="w-5 h-5 mt-0.5 text-blue-500 flex-shrink-0" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700">Date</p>
                        <p className="text-sm text-gray-600">
                          {event.schedule && event.schedule.length > 0 ?
                            format(new Date(event.schedule[0].date), 'EEEE, MMMM d, yyyy') :
                            'Date not specified'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Clock className="w-5 h-5 mt-0.5 text-blue-500 flex-shrink-0" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700">Time</p>
                        {event.schedule.map((item) => (
                          <p className="text-sm text-gray-500">
                            {/* {format(new Date(item.startTime), 'h:mm a')} - {format(new Date(item.endTime), 'h:mm a')} */}
                            {`${item.startTime} to ${item.endTime}`}
                          </p>

                        ))}
                      </div>
                    </div>

                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 mt-0.5 text-blue-500 flex-shrink-0" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700">Venue</p>
                        <p className="text-sm text-gray-600">{event.venueName || 'Location not specified'}</p>
                        {event.address && <p className="text-xs text-gray-500">{event.address}</p>}
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Tag className="w-5 h-5 mt-0.5 text-blue-500 flex-shrink-0" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700">Category</p>
                        <p className="text-sm text-gray-600">{event.category}</p>
                      </div>
                    </div>

                    {event.hostedBy && (
                      <div className="flex items-start">
                        <User className="w-5 h-5 mt-0.5 text-blue-500 flex-shrink-0" />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-700">Host</p>
                          <p className="text-sm text-gray-600">{event.hostedBy}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Ticket Information */}
                <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-800">Ticket Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <DollarSign className="w-5 h-5 mt-0.5 text-green-500 flex-shrink-0" />
                      <div className="ml-3">
                        <p className="text-sm font-medium  text-gray-700">Price</p>
                        {event.ticketTypeDescription && event.ticketTypeDescription.map((item) => (
                          <>
                            <p className="text-sm text-gray-600">{`${item.ticketType} - ₹${item.price}`}</p>

                          </>

                        ))}
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Users className="w-5 h-5 mt-0.5 text-green-500 flex-shrink-0" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700">Max Per User</p>
                        {/* <p className="text-sm text-gray-600">{event.maxTicketsPerUser} tickets</p> */}
                        {event.ticketTypeDescription && event.ticketTypeDescription.map((item) => (
                          <>
                            <p className="text-sm text-gray-600">{`${item.ticketType} - ${item.maxCount} tickets`}</p>

                          </>

                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700 mb-2">Sales Progress</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-grow">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(event.ticketPurchased / event.totalTicket) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-600 whitespace-nowrap">
                        {event.ticketPurchased}/{event.totalTicket} sold
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-6 pt-4 border-t border-gray-100">
                <Button variant="outline" onClick={onClose} className="gap-2">
                  Close
                </Button>
                {/* {onEdit && (
                  <Button onClick={() => event && onEdit(event)} className="gap-2">
                    Edit Event
                  </Button>
                )} */}
              </DialogFooter>
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsModal;
