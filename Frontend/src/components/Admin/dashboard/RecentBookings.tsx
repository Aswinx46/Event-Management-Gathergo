"use client"
import { motion } from "framer-motion"
import { format } from "date-fns"
import {
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  MoreHorizontal,
  Phone,
  User,
  X,
  XCircle,
} from "lucide-react"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export interface BookingEntity {
  _id?: string
  serviceId: string
  clientId: string
  vendorId: string
  date: Date[]
  email: string
  phone: number
  vendorApproval: "Pending" | "Approved" | "Rejected"
  paymentStatus: "Pending" | "Failed" | "Successfull" | "Refunded"
  rejectionReason?: string
  status: "Pending" | "Rejected" | "Completed" | "Cancelled"
  createdAt: Date
  isComplete: boolean
}

interface RecentBookingsProps {
  bookings: BookingEntity[]
  onViewDetails?: (booking: BookingEntity) => void
}

export default function RecentBookings({ bookings, onViewDetails }: RecentBookingsProps) {
  // Take only the 5 most recent bookings
  const recentBookings = bookings.slice(0, 5)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <div className="w-full bg-white rounded-xl px-7 shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">Recent Bookings</h2>
        <p className="text-sm text-gray-500 mt-1">Latest 5 booking requests</p>
      </div>

      {recentBookings.length === 0 ? (
        <div className="p-8 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-gray-500">
            No recent bookings found
          </motion.div>
        </div>
      ) : (
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="divide-y divide-gray-100">
          {recentBookings.map((booking, index) => (
            <motion.div
              key={booking._id || `booking-${index}`}
              variants={itemVariants}
              whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.8)" }}
              className="p-4 sm:p-6 relative"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <StatusBadge status={booking.status} />
                    <PaymentBadge status={booking.paymentStatus} />
                    <ApprovalBadge status={booking.vendorApproval} />
                  </div>

                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    Booking {booking._id ? booking._id.substring(0, 8) : `#${index + 1}`}
                  </h3>

                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>
                        {booking.date.length > 0 ? format(new Date(booking.date[0]), "MMM dd, yyyy") : "No date"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" />
                      <span className="truncate">{booking.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5" />
                      <span>{booking.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{format(new Date(booking.createdAt), "MMM dd, HH:mm")}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
                    onClick={() => onViewDetails?.(booking)}
                  >
                    View Details
                  </motion.button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <MoreHorizontal className="h-4 w-4 text-gray-500" />
                      </motion.button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Contact Client</DropdownMenuItem>
                      <DropdownMenuItem>Update Status</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Cancel Booking</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="p-4 bg-gray-50 border-t border-gray-100 text-center"
      >
        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">View All Bookings</button>
      </motion.div>
    </div>
  )
}

function StatusBadge({ status }: { status: BookingEntity["status"] }) {
  let color
  let icon

  switch (status) {
    case "Completed":
      color = "bg-green-50 text-green-700 border-green-200"
      icon = <CheckCircle className="h-3 w-3" />
      break
    case "Cancelled":
      color = "bg-red-50 text-red-700 border-red-200"
      icon = <XCircle className="h-3 w-3" />
      break
    case "Rejected":
      color = "bg-orange-50 text-orange-700 border-orange-200"
      icon = <X className="h-3 w-3" />
      break
    case "Pending":
    default:
      color = "bg-blue-50 text-blue-700 border-blue-200"
      icon = <Clock className="h-3 w-3" />
      break
  }

  return (
    <Badge variant="outline" className={`${color} flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium border`}>
      {icon}
      {status}
    </Badge>
  )
}

function PaymentBadge({ status }: { status: BookingEntity["paymentStatus"] }) {
  let color
  const icon = <DollarSign className="h-3 w-3" />

  switch (status) {
    case "Successfull":
      color = "bg-emerald-50 text-emerald-700 border-emerald-200"
      break
    case "Failed":
      color = "bg-red-50 text-red-700 border-red-200"
      break
    case "Refunded":
      color = "bg-purple-50 text-purple-700 border-purple-200"
      break
    case "Pending":
    default:
      color = "bg-yellow-50 text-yellow-700 border-yellow-200"
      break
  }

  return (
    <Badge variant="outline" className={`${color} flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium border`}>
      <CreditCard className="h-3 w-3" />
      {status}
    </Badge>
  )
}

function ApprovalBadge({ status }: { status: BookingEntity["vendorApproval"] }) {
  if (status === "Pending") return null // Don't show if pending

  let color
  let icon

  switch (status) {
    case "Approved":
      color = "bg-green-50 text-green-700 border-green-200"
      icon = <CheckCircle className="h-3 w-3" />
      break
    case "Rejected":
      color = "bg-red-50 text-red-700 border-red-200"
      icon = <X className="h-3 w-3" />
      break
    default:
      return null
  }

  return (
    <Badge variant="outline" className={`${color} flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium border`}>
      {icon}
      {status}
    </Badge>
  )
}
