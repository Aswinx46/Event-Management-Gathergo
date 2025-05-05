"use client"

import { motion } from "framer-motion"
import type { BookingType } from "@/types/BookingType"
import { EventEntity as EventType } from "@/types/EventEntity"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface RecentBookingsProps {
  bookings: BookingType[]
  events: EventType[]
}

export function RecentBookings({ bookings, events }: RecentBookingsProps) {
  // Get most recent 5 bookings
  const recentBookings = [...bookings]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  // Get event details for each booking
  const bookingsWithEvents = recentBookings.map((booking) => {
    const event = events.find((event) => event._id === booking.serviceId)
    return { booking, event }
  })

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
    hidden: { x: -20, opacity: 0 },
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
      {bookingsWithEvents.map(({ booking, event }) => (
        <motion.div
          key={booking._id}
          variants={item}
          className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors"
        >
          <div className="flex flex-col">
            <span className="font-medium">{booking?.title || "Unknown Event"}</span>
            <span className="text-sm text-muted-foreground">{booking.email}</span>
            <span className="text-xs text-muted-foreground">{new Date(booking.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="flex flex-col items-end gap-2">
            <Badge
              className={cn(
                booking.paymentStatus === "Successfull" && "bg-green-100 text-green-800 hover:bg-green-100",
                booking.paymentStatus === "Pending" && "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
                booking.paymentStatus === "Failed" && "bg-red-100 text-red-800 hover:bg-red-100",
                booking.paymentStatus === "Refunded" && "bg-gray-100 text-gray-800 hover:bg-gray-100",
              )}
            >
              {booking.paymentStatus}
            </Badge>

            <Badge
              variant="outline"
              className={cn(
                booking.status === "Completed" && "border-green-500 text-green-700",
                booking.status === "Pending" && "border-yellow-500 text-yellow-700",
                booking.status === "Rejected" && "border-red-500 text-red-700",
              )}
            >
              {booking.status}
            </Badge>
          </div>
        </motion.div>
      ))}

      {bookingsWithEvents.length === 0 && (
        <div className="text-center py-6 text-muted-foreground">No recent bookings found</div>
      )}
    </motion.div>
  )
}
