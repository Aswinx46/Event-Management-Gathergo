

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EventCard } from './EventCardAdmin';
import { EventEntity } from '../../../types/EventEntity';
// import { mockEvents } from '@/data/mockEvents';
import EventDetailsModal from './EventlistingModalAdmin';
import { useFindEventsInAdmin } from '@/hooks/AdminCustomHooks';
import Pagination from '@/components/other components/Pagination';

export const EventsListingAdmin: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const findEvents = useFindEventsInAdmin(currentPage)
  //   console.log(findEvents.data)
  const events: EventEntity[] = findEvents.data?.events
  const totalPages = findEvents.data?.totalPages
  const [selectedEvent, setSelectedEvent] = useState<EventEntity | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewEventDetails = (event: EventEntity) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditEvent = (event: EventEntity) => {
    console.log("Edit event:", event);
    setIsModalOpen(false);
  };



  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Events Management</h1>

          {/* Events list */}
          {events?.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10 text-gray-500"
            >
              No events found
            </motion.div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {events?.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  onClick={() => handleViewEventDetails(event)}
                />
              ))}
            </motion.div>
          )}
        </div>

        {/* Details Modal */}
        <EventDetailsModal
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onEdit={handleEditEvent}
        />
      </div>
      <Pagination current={currentPage} setPage={setCurrentPage} total={totalPages} />
    </>
  );
};