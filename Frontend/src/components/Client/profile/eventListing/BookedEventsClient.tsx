import { motion } from "framer-motion";
import { Calendar, MapPin, Ticket } from "lucide-react";
import { TicketAndEventDTO } from "@/types/TicketAndEventDTO";
import { useState } from "react";
import { useAddReview, useFindTicketAndEventsDetails, useTicketCancellation } from "@/hooks/ClientCustomHooks";
import Pagination from "@/components/other components/Pagination";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import TicketModal from "./TicketDetailsModal";
import { toast } from "react-toastify";
import ConfirmModal from "@/components/other components/ConfirmationModal";
import { useQueryClient } from "@tanstack/react-query";
import { ReviewEntity } from "@/types/ReviewType";
import AddReviewModal from "@/components/other components/review/AddReview";
import { CloudinaryPreset } from "@/utils/cloudinaryPresetFile";

const BookedEvents = () => {
  const clientId = useSelector((state: RootState) => state.clientSlice.client?._id)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const ticketCancellationHook = useTicketCancellation()
  const [showCancelAlert, setShowCancelAlert] = useState<boolean>(false)
  const ticketAndEvent = useFindTicketAndEventsDetails(clientId!, currentPage)
  const ticketAndEvents: TicketAndEventDTO[] = ticketAndEvent.data?.ticketAndEventDetails
  const totalPages = ticketAndEvent.data?.totalPages
  const [selectedEvent, setSelectedEvent] = useState<TicketAndEventDTO>()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedTicketId, setSelectedTicketId] = useState<string>('')
  const [showAddReviewModal, setShowAddReviewModal] = useState<boolean>(false)
  const [selectedEventIdForReview, setSelectedEventIdForReview] = useState<string>('')
  const queryClient = useQueryClient()
  const addReview = useAddReview()
  const handleTicketCancel = () => {
    ticketCancellationHook.mutate(selectedTicketId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['ticketAndEventDetaills', currentPage] })
        setShowCancelAlert(false)
        setIsOpen(false)
        toast.success('Ticket Cancelled')
      },
      onError: (err) => {
        toast.error(err.message)
      }
    })
  }

  const ticketCancellationNotice = `
⚠️ Important Notice  
Upon cancellation, only 70% of the total ticket amount will be refunded to your wallet.  
The remaining 30% is non-refundable as per our cancellation policy.  
This action is irreversible. Are you sure you want to proceed?
`;
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


  const handleOnClickTicketCancel = (ticketId: string) => {
    setSelectedTicketId(ticketId)
    setShowCancelAlert(true)
  }

  const handleAddReviewSubmit = (review: ReviewEntity) => {
    console.log(selectedEventIdForReview)
    addReview.mutate(review, {
      onSuccess: () => toast.success('Review Added'),
      onError: (err) => toast.error(err.message)
    },
    )
  }



  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {isOpen && <TicketModal open={isOpen} setIsOpen={setIsOpen} ticket={selectedEvent!} />}
      {showAddReviewModal && <AddReviewModal isOpen={showAddReviewModal} onClose={() => setShowAddReviewModal(false)} onSubmit={handleAddReviewSubmit} reviewerId={clientId!} targetId={selectedEventIdForReview} targetType="event" />}
      {showCancelAlert && <ConfirmModal content={ticketCancellationNotice} isOpen={showCancelAlert} onCancel={() => setShowCancelAlert(false)} onConfirm={handleTicketCancel} />}
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
                      src={CloudinaryPreset+ticketAndEvent.event.posterImage[0]}
                      alt={ticketAndEvent.event.title}
                      className="h-full w-full object-cover transform transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                )}

                {/* Event Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">{ticketAndEvent.event.title}</h3>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium transform transition-transform duration-300 hover:scale-105 ${ticketAndEvent.event.status === "cancelled"
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
                      <div className="flex flex-col">
                        {ticketAndEvent?.event.schedule?.map((item, i) => (
                          <>
                            <span key={i} className=" text-sm line-clamp-1 overflow-auto scroll-auto hide-scrollbar text-amber-900-300">
                              {new Date(item.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })} -
                              <span>     {`${item.startTime} to ${item.endTime} `}</span>
                            </span>
                          </>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 col-span-2">
                      <MapPin className="h-4 w-4 text-purple-500" />
                      <span className="truncate">{ticketAndEvent.event.address || 'Location not specified'}</span>
                    </div>
                    <span className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      ₹{ticketAndEvent.amount.toFixed(2)}
                    </span>
                  </div>
                  <span className="inline-block px-4 py-1 text-lg font-bold text-white bg-gradient-to-r from-black  to-gray-800 rounded-lg shadow-lg">
                    {ticketAndEvent.ticketType.toUpperCase()}
                  </span>


                </div>
              </div>

              <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-100">



                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleClickTicketAndEvent(ticketAndEvent)}
                  className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:shadow-purple-300/50"
                >
                  View Ticket Details
                </motion.button>

                {ticketAndEvent.ticketStatus == 'unused' && ticketAndEvent.event.status !== 'cancelled' && <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleOnClickTicketCancel(ticketAndEvent._id!)}
                  className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:shadow-purple-300/50"
                >
                  Cancel Ticket
                </motion.button>}
                {ticketAndEvent.ticketStatus == 'used' && <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setShowAddReviewModal(true); setSelectedEventIdForReview(ticketAndEvent.event._id) }}
                  className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:shadow-purple-300/50"
                >
                  Add Review
                </motion.button>}
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