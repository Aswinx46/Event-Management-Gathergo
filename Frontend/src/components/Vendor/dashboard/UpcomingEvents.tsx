"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, MapPin } from "lucide-react"
import type { EventEntity as EventType } from "@/types/EventEntity"
import { Badge } from "@/components/ui/badge"
import { CloudinaryPreset } from "@/utils/cloudinaryPresetFile"

interface UpcomingEventsProps {
  events: EventType[]
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  // Get upcoming events
  const upcomingEvents = events
    .filter((event) => event.status === "upcoming")
    .sort((a, b) => new Date(a.schedule[0].startTime).getTime() - new Date(b.schedule[0].startTime).getTime())
    .slice(0, 5)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { x: 20, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  }

  return (
    <motion.div className="space-y-4" variants={container} initial="hidden" animate="show">
      {upcomingEvents.map((event) => (
        <motion.div
          key={event._id}
          variants={item}
          className="flex items-center space-x-4 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
        >
          <div className="w-16 h-16 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
            {event.posterImage && event.posterImage.length > 0 ? (
              <img
                src={CloudinaryPreset + event.posterImage[0] || "/placeholder.svg"}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <Calendar className="h-8 w-8 text-gray-400" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-medium truncate">{event.title}</h4>

            <div className="flex flex-col mt-1 text-xs text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {event.schedule.map((item) => (
                  <p className="text-sm text-gray-500">
                    {/* {formatDate(item.startTime)} at {event.venueName} */}
                    <span>{new Date(item.startTime).toLocaleDateString()}</span>
                  </p>

                ))}
              </div>

              <div className="flex items-center mt-1">
                <Clock className="h-3 w-3 mr-1" />
                {event.schedule.map((item) => (
                  <>
                    {/* {formatDate(item.startTime)} at {event.venueName} */}
                    <span>{new Date(item.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                  </>


                ))}
              </div>

              <div className="flex items-center mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                <span className="truncate">{event.venueName || event.address || "Location not specified"}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">{event.category}</Badge>

            <span className="text-sm font-medium mt-2">₹{event.pricePerTicket}</span>

            <span className="text-xs text-muted-foreground">
              {event.ticketPurchased}/{event.totalTicket} sold
            </span>
          </div>
        </motion.div>
      ))
      }

      {
        upcomingEvents.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">No upcoming events found</div>
        )
      }
    </motion.div >
  )
}
