import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Ticket } from "lucide-react";
import { format } from "date-fns";
import { TicketAndEventDTO } from "@/types/TicketAndEventDTO";
import { useState } from "react";
import { useFindTicketAndEventsDetails } from "@/hooks/ClientCustomHooks";
import Pagination from "@/components/other components/Pagination";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import TicketModal from "./TicketDetailsModal";

const BookedEvents = () => {
  const clientId = useSelector((state: RootState) => state.clientSlice.client?._id)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const ticketAndEvent = useFindTicketAndEventsDetails(clientId!, currentPage)
  const ticketAndEvents: TicketAndEventDTO[] = ticketAndEvent.data?.ticketAndEventDetails
  const totalPages = ticketAndEvent.data?.totalPages
  const [selectedEvent, setSelectedEvent] = useState<TicketAndEventDTO>()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  if (!ticketAndEvents || ticketAndEvents.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="bg-purple-50 p-8 rounded-full mb-4">
          <Ticket className="w-12 h-12 text-purple-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Booked Events</h3>
        <p className="text-gray-600 max-w-sm">You haven't booked any events yet. Explore our events and start your journey!</p>
      </div>
    );
  }

  const handleClickTicketAndEvent = (ticketAndEvent: TicketAndEventDTO) => {
    setSelectedEvent(ticketAndEvent)
    setIsOpen(true)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {isOpen && <TicketModal open={isOpen} setIsOpen={setIsOpen} ticket={selectedEvent!} />}
      
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Your Booked Events
        </h2>
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-2 rounded-lg">
          <span className="text-sm font-medium text-purple-800">
            {ticketAndEvents.length} {ticketAndEvents.length === 1 ? 'Event' : 'Events'} Booked
          </span>
        </div>
      </div>

      <motion.div
        className="grid gap-6 md:grid-cols-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {ticketAndEvents.map((ticketAndEvent) => (
          <motion.div
            key={ticketAndEvent._id}
            className={`rounded-xl border backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-2xl 
              ${ticketAndEvent.event.status === "cancelled"
                ? "border-red-200 bg-red-50/90"
                : ticketAndEvent.event.status === "completed"
                  ? "border-gray-200 bg-gray-50/90"
                  : "border-purple-200 bg-purple-50/90"
              }`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="p-5">
              <div className="flex gap-6">
                {/* Event Image */}
                {ticketAndEvent.event.posterImage && ticketAndEvent.event.posterImage.length > 0 && (
                  <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg shadow-md">
                    <img
                      src={ticketAndEvent.event.posterImage[0]}
                      alt={ticketAndEvent.event.title}
                      className="h-full w-full object-cover transform transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                )}

                {/* Event Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">{ticketAndEvent.event.title}</h3>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium transform transition-transform duration-300 hover:scale-105 ${
                      ticketAndEvent.event.status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : ticketAndEvent.event.status === "completed"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-purple-100 text-purple-800"
                    }`}>
                      {ticketAndEvent.event.status.charAt(0).toUpperCase() + ticketAndEvent.event.status.slice(1)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">{ticketAndEvent.event.description}</p>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4 text-purple-500" />
                      <span className="truncate">{ticketAndEvent.event.date.length > 0 ? format(new Date(ticketAndEvent.event.date[0]), 'MMM dd, yyyy') : 'Date not set'}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4 text-purple-500" />
                      <span className="truncate">
                        {format(new Date(ticketAndEvent.event.startTime), 'h:mm a')} - {format(new Date(ticketAndEvent.event.endTime), 'h:mm a')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 col-span-2">
                      <MapPin className="h-4 w-4 text-purple-500" />
                      <span className="truncate">{ticketAndEvent.event.address || 'Location not specified'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ₹{ticketAndEvent.event.pricePerTicket.toFixed(2)}
                </span>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleClickTicketAndEvent(ticketAndEvent)}
                  className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:shadow-purple-300/50"
                >
                  View Ticket Details
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-8">
        <Pagination current={currentPage} setPage={setCurrentPage} total={totalPages} />
      </div>
    </div>
  );
};

export default BookedEvents;