import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, MapPin, Edit } from "lucide-react";
import { EventEntity } from "../../../types/EventEntity";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLocation, useNavigate } from "react-router-dom";
import { EventEdit } from "@/components/Vendor/event/EditEvent";
import { useCancelEvent, useUpdateEvent } from "@/hooks/VendorCustomHooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { CloudinaryPreset } from "@/utils/cloudinaryPresetFile";

interface EventDetailModalProps {
    event: EventEntity | null;
    isOpen: boolean;
    onClose: () => void;
    onEdit: (event: EventEntity) => void;
    currentPage: number
}






const getStatusColor = (status: "upcoming" | "completed" | "cancelled" | "onGoing"): string => {
    switch (status) {
        case "upcoming":
            return "bg-emerald-900/50 text-emerald-300";
        case "completed":
            return "bg-zinc-800/50 text-zinc-300";
        case "cancelled":
            return "bg-red-900/50 text-red-300";
        case "onGoing":
            return "bg-green-600/50 text-red-300";
        default:
            return "bg-blue-900/50 text-blue-300";
    }
};

const formatTicketAvailability = (totalTicket: number, ticketPurchased: number): string => {
    const available = totalTicket - ticketPurchased;
    // const percentLeft = Math.round((available / totalTicket) * 100);

    if (available <= 0) {
        return "Sold out";
    } else if (available <= totalTicket * 0.1) {
        return `Only ${available} tickets left!`;
    } else {
        return `${available} tickets available`;
    }
};

const EventDetailModal: React.FC<EventDetailModalProps> = ({
    event,
    isOpen,
    onClose,
    currentPage
}) => {
    const location = useLocation()
    const cancelEvent = useCancelEvent()
    const editEvent = useUpdateEvent()
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const [selectedEvent, setSelectedEvent] = useState<EventEntity | null>(null)
    if (!event) return null;
    const verifyPathName = location.pathname.split('/')[1]
    const percentageSold = (event.ticketPurchased / event.totalTicket) * 100;
    const handleEdit = (event: EventEntity) => {
        setSelectedEvent(event)
        onClose()
        setShowEdit(true)
    }



    const handleOnSaveEdit = (event: EventEntity) => {
        editEvent.mutate({ eventId: event._id, update: event }, {
            onSuccess: (data) => {
                toast.success(data.message)
                queryClient.invalidateQueries({ queryKey: ['eventsInVendor', currentPage] })
                setShowEdit(false)
            },
            onError: (err) => {
                toast.error(err.message)
            }
        })
    }

    const handleCancelEvent = async (eventId: string) => {
        cancelEvent.mutate(eventId, {
            onSuccess: () => {
                toast.success("Eventt Cancelled")
                queryClient.invalidateQueries({ queryKey: ['eventsInVendor', currentPage] })
                setShowEdit(false)
            },
            onError: (err) => {
                toast.error(err.message)
                console.log('error while canceling the event', err)
            }
        })
    }
    return (
        <AnimatePresence>
            {showEdit && <EventEdit event={selectedEvent!} onClose={() => setShowEdit(false)} onSave={handleOnSaveEdit} isOpen={showEdit} onCancel={handleCancelEvent} />}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4  bg-black/80">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0"
                    />

                    <motion.div
                        className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl  overflow-hidden max-w-3xl w-full max-h-[90vh] z-50 relative"
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        <div className="flex justify-between items-center p-4 border-b border-zinc-800">
                            <div className="flex items-center">
                                <Badge className={getStatusColor(event.status)}>
                                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                </Badge>
                                <span className="ml-2 text-sm text-zinc-400">
                                    {event.category}
                                </span>
                            </div>

                            <div className="flex items-center space-x-2">
                                {verifyPathName == 'vendor' && event.status !== 'cancelled' && event.status !== 'completed' && <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleEdit(event)}
                                    className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                                >
                                    <Edit className="h-4 w-4" />
                                </Button>}
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onClose();
                                    }}
                                    className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>

                        </div>

                        <div className="overflow-y-auto hide-scrollbar max-h-[calc(90vh-130px)]">
                            <div className="relative aspect-video">
                                <img
                                    src={CloudinaryPreset +event.posterImage[0] || "https://placehold.co/600x400/171717/FFFFFF?text=Event"}
                                    alt={event.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="p-6">
                                <motion.h2
                                    className="text-2xl font-bold text-white mb-2"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    {event.title}
                                </motion.h2>

                                <motion.div
                                    className="flex flex-wrap gap-4 mb-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <div className="flex items-center text-zinc-300">
                                        <Calendar className="h-5 w-5 mr-2 text-purple-400" />
                                        <div className="flex flex-col">
                                            {event.schedule.length > 0 && event.schedule.map((item) => <span>{`${new Date(item.date).toDateString()} - ${item.startTime} to ${item.endTime}`}</span>)}

                                        </div>
                                        {/* {event.schedule.length > 0 && <span>{sortedSchedule.length > 1 ? ` ${formatDate(new Date(sortedSchedule[0].date))} to ${formatDate(new Date(sortedSchedule[event.schedule?.length - 1].date))}` : formatDate(new Date(sortedSchedule[0].date))}</span>} */}
                                    </div>

                                    <div className="flex items-center text-zinc-300">
                                        <Clock className="h-5 w-5 mr-2 text-purple-400" />

                                    </div>

                                    {event.venueName && (
                                        <div className="flex items-center text-zinc-300">
                                            <MapPin className="h-5 w-5 mr-2 text-purple-400" />
                                            <span>{event.venueName}</span>
                                        </div>
                                    )}
                                </motion.div>

                                <Separator className="my-4 bg-zinc-800" />

                                <motion.div
                                    className="space-y-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <h3 className="text-lg font-semibold text-white">About this event</h3>
                                    <p className="text-zinc-300 whitespace-pre-line">{event.description}</p>

                                    {event.address && (
                                        <div className="mt-4">
                                            <h3 className="text-lg font-semibold text-white mb-2">Location</h3>
                                            <p className="text-zinc-300">{event.address}</p>
                                        </div>
                                    )}
                                </motion.div>

                                <Separator className="my-6 bg-zinc-800" />

                                <motion.div
                                    className="bg-zinc-800/50 p-4 rounded-lg"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-semibold text-white">Tickets</h3>
                                        {/* <span className="text-purple-400 font-bold text-xl">
                                            {event.pricePerTicket > 0 ? formatCurrency(event.pricePerTicket) : "Free"}
                                        </span> */}
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-zinc-400">Availability</span>
                                            <span className="font-medium text-zinc-300">{formatTicketAvailability(event.totalTicket, event.ticketPurchased)}</span>
                                        </div>
                                        <Progress value={percentageSold} className="h-2 bg-zinc-700" />
                                    </div>

                                    <div className="mt-4 flex flex-col gap-4 justify-center">
                                        {event.status === "completed" ? (
                                            <Button disabled className="w-full bg-gray-400 text-white cursor-not-allowed">
                                                Event Completed
                                            </Button>
                                        ) : event.status === "cancelled" ? (
                                            <Button disabled className="w-full bg-red-400 text-white cursor-not-allowed">
                                                Event Cancelled
                                            </Button>
                                        ) : location.pathname.split('/')[1] !== 'vendor' && event.totalTicket - event.ticketPurchased > 0 ? (
                                            <Button
                                                onClick={() => navigate(`/event/${event._id}`)}
                                                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                                            >
                                                Get Tickets
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={() => navigate('/vendor/scanTicket')}
                                                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                                            >
                                                Scan Tickets
                                            </Button>
                                        )}
                                        {location.pathname.split('/')[1] == 'vendor' && <Button
                                            onClick={() => navigate(`/vendor/ticketListing`, { state: { eventId: event._id } })}
                                            className="w-full bg-purple-800 hover:bg-purple-700 text-white"
                                        >
                                            Show Ticket Details
                                        </Button>}
                                    </div>

                                    <div className="mt-2 text-center text-xs text-zinc-500">
                                        <span>{event.maxTicketsPerUser} tickets max per person</span>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default EventDetailModal;
