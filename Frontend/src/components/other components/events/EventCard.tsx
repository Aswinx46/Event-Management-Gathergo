import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users } from "lucide-react";
import { EventEntity } from "../../../types/EventEntity";
import { format, isToday, isTomorrow } from "date-fns";

interface EventCardProps {
    event: EventEntity;
    onClick: () => void;
}

const formatDate = (date: Date): string => {
    // console.log(date)
    // if (isToday(date)) {
    //     return `Today at ${format(date, "h:mm a")}`;
    // } else if (isTomorrow(date)) {
    //     return `Tomorrow at ${format(date, "h:mm a")}`;
    // } else {
    //     return format(date, "EEE, MMM d, yyyy 'at' h:mm a");
    // }
    if (isToday(date)) {
        return "Today";
    } else if (isTomorrow(date)) {
        return "Tomorrow";
    } else {
        return format(date, "EEE, MMM d, yyyy"); // Example: "Fri, May 2, 2025"
    }
};


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

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
    const sortedSchedule = [...event.schedule].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    return (
        <motion.div
            onClick={onClick}
            className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden  cursor-pointer hover:border-zinc-700 transition-all h-[400px] flex flex-col"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="relative h-[180px]">
                <img
                    src={event.posterImage[0] || "https://placehold.co/600x400/171717/FFFFFF?text=Event"}
                    alt={event.title}
                    className="w-full h-full object-cover "
                />
                <div className="absolute top-2 right-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full uppercase ${getStatusColor(event.status)}`}>
                        {event.status}
                    </span>
                </div>
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <div className="flex-grow">
                    <h3 className="font-semibold text-lg line-clamp-1 text-white mb-2">{event.title}</h3>
                    <p className="text-zinc-400 text-sm line-clamp-2 mb-3">{event.description}</p>

                    <div className="space-y-2">
                        <div className="flex items-center text-sm text-zinc-400">
                            <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                            <div className="flex flex-col">
                                {event.schedule.length > 0 && sortedSchedule.map((item) => <span>{`${formatDate(new Date(item.date))} - ${item.startTime} to ${item.endTime}`}</span>)}
                            </div>
                        </div>

                        {event.venueName && (
                            <div className="flex items-center text-sm text-zinc-400">
                                <MapPin className="h-4 w-4 mr-2 text-purple-400" />
                                <span className="line-clamp-1">{event.venueName}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-zinc-800 mt-3">
                    <span className="text-purple-400 font-semibold">
                        {/* {event.pricePerTicket > 0 ? formatCurrency(event.pricePerTicket) : "Free"} */}
                    </span>

                    <div className="flex items-center text-xs text-zinc-500">
                        <Users className="h-3 w-3 mr-1" />
                        <span>{event.ticketPurchased} attending</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default EventCard;