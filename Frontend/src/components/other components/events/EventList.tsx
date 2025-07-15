import React, { useState } from "react";
import { motion } from "framer-motion";
import { EventEntity } from "../../../types/EventEntity";
import EventCard from "./EventCard";
import EventDetailModal from "./EventDetailsModal";
import EventCardSkeleton from "./EventtCardSkeleton";

interface EventListProps {
    events: EventEntity[];
    isLoading?: boolean;
    onEditEvent?: (event: EventEntity) => void;
    currentPage: number
}

const EventList: React.FC<EventListProps> = ({
    events,
    isLoading = false,
    onEditEvent = () => { },
    currentPage
}) => {
    const [selectedEvent, setSelectedEvent] = useState<EventEntity | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleEventClick = (event: EventEntity) => {
        setSelectedEvent(event);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleEditEvent = (event: EventEntity) => {
        setModalOpen(false);
        onEditEvent(event);
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                        <div key={index}>
                            <EventCardSkeleton />
                        </div>
                    ))}
                </div>
            ) : events?.length > 0 ? (
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {events?.map((event) => (
                        <div key={event._id?.toString() || event.title} className="h-full">
                            <EventCard
                                event={event}
                                onClick={() => handleEventClick(event)}
                            />
                        </div>
                    ))}
                </motion.div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No events found</h3>
                        <p className="text-gray-600">There are no events to display at this time.</p>
                    </motion.div>
                </div>
            )}

            <EventDetailModal
                event={selectedEvent}
                isOpen={modalOpen}
                onClose={handleCloseModal}
                onEdit={handleEditEvent}
                currentPage={currentPage}
            />
        </div>
    );
};

export default EventList;