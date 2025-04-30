
import React, { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Info, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingDetailsModal from "./BookingDetailsModalAdmin";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BookingDetailsInAdminEntity as Booking } from "@/types/BookingDetailsAdmin";
// Define the Booking type to match the provided interface

// Sample data - in a real app this would come from an API or props
const sampleBookings: Booking[] = [
  {
    _id: "1",
    serviceId: "service123",
    clientId: {
      _id: "client1",
      name: "Alex Smith",
      profileImage: "https://i.pravatar.cc/150?img=1"
    },
    vendorId: {
      _id: "vendor1",
      name: "Service Provider Inc.",
      profileImage: "https://i.pravatar.cc/150?img=10"
    },
    date: [new Date("2025-05-01T10:00:00"), new Date("2025-05-01T11:00:00")],
    email: "alex@example.com",
    phone: 1234567890,
    vendorApproval: "Approved",
    paymentStatus: "Successfull",
    status: "Pending",
    createdAt: new Date("2025-04-25"),
    isComplete: false
  },
  {
    _id: "2",
    serviceId: "service456",
    clientId: {
      _id: "client2",
      name: "Jamie Lee",
      profileImage: "https://i.pravatar.cc/150?img=2"
    },
    vendorId: {
      _id: "vendor1",
      name: "Service Provider Inc.",
      profileImage: "https://i.pravatar.cc/150?img=10"
    },
    date: [new Date("2025-05-03T14:30:00"), new Date("2025-05-03T16:00:00")],
    email: "jamie@example.com",
    phone: 2345678901,
    vendorApproval: "Pending",
    paymentStatus: "Pending",
    status: "Pending",
    createdAt: new Date("2025-04-26"),
    isComplete: false
  },
  {
    _id: "3",
    serviceId: "service789",
    clientId: {
      _id: "client3",
      name: "Sam Johnson",
      profileImage: "https://i.pravatar.cc/150?img=3"
    },
    vendorId: {
      _id: "vendor2",
      name: "Expert Services LLC",
      profileImage: "https://i.pravatar.cc/150?img=11"
    },
    date: [new Date("2025-05-05T11:00:00"), new Date("2025-05-05T11:45:00")],
    email: "sam@example.com",
    phone: 3456789012,
    vendorApproval: "Rejected",
    paymentStatus: "Refunded",
    rejectionReason: "Provider unavailable at requested time",
    status: "Rejected",
    createdAt: new Date("2025-04-27"),
    isComplete: false
  },
  {
    _id: "4",
    serviceId: "service101",
    clientId: {
      _id: "client4",
      name: "Taylor Morgan",
      profileImage: "https://i.pravatar.cc/150?img=4"
    },
    vendorId: {
      _id: "vendor2",
      name: "Expert Services LLC",
      profileImage: "https://i.pravatar.cc/150?img=11"
    },
    date: [new Date("2025-05-07T09:00:00"), new Date("2025-05-07T11:00:00")],
    email: "taylor@example.com",
    phone: 4567890123,
    vendorApproval: "Approved",
    paymentStatus: "Successfull",
    status: "Completed",
    createdAt: new Date("2025-04-28"),
    isComplete: true
  },
  {
    _id: "5",
    serviceId: "service202",
    clientId: {
      _id: "client5",
      name: "Jordan Riley",
      profileImage: "https://i.pravatar.cc/150?img=5"
    },
    vendorId: {
      _id: "vendor3",
      name: "Premium Services Co.",
      profileImage: "https://i.pravatar.cc/150?img=12"
    },
    date: [new Date("2025-05-10T13:00:00"), new Date("2025-05-10T16:00:00")],
    email: "jordan@example.com",
    phone: 5678901234,
    vendorApproval: "Approved",
    paymentStatus: "Failed",
    status: "Cancelled",
    createdAt: new Date("2025-04-29"),
    isComplete: false
  },
];

const getStatusColor = (status: Booking["status"] | Booking["vendorApproval"] | Booking["paymentStatus"]) => {
  switch (status) {
    case "Completed":
    case "Approved":
    case "Successfull":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    case "Pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
    case "Cancelled":
    case "Rejected":
    case "Failed":
    case "Refunded":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
  }
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const BookingsListAdmin: React.FC = () => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Reset the selected booking after the modal close animation completes
    setTimeout(() => setSelectedBooking(null), 300);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Your Bookings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage all your scheduled appointments and services
        </p>
      </header>

      <div className="grid gap-4">
        {sampleBookings.map((booking, index) => (
          <motion.div
            key={booking._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.01 }}
            className="w-full"
          >
            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleBookingClick(booking)}
            >
              <CardContent className="p-0">
                <div className="flex items-center border-l-4 border-indigo-500 dark:border-indigo-400 p-4">
                  <div className="flex-shrink-0 mr-4">
                    <Avatar className="h-12 w-12 border border-gray-200 dark:border-gray-700">
                      <AvatarImage src={booking.clientId.profileImage} alt={booking.clientId.name} />
                      <AvatarFallback>{booking.clientId.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex-grow">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h3 className="font-medium text-lg text-gray-900 dark:text-white">{booking.clientId.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                        <Badge className={getStatusColor(booking.paymentStatus)}>
                          {booking.paymentStatus}
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center">
                        <CalendarDays className="h-4 w-4 mr-1 text-gray-500" />
                        <span className="font-medium">{formatDate(booking.date[0])}</span>
                        <span className="mx-2 text-gray-400">•</span>
                        <Clock className="h-4 w-4 mr-1 text-gray-500" />
                        <span>{formatTime(booking.date[0])}</span>
                      </div>
                      <div className="mt-1 flex items-center">
                        <User className="h-4 w-4 mr-1 text-gray-500" />
                        <span>Vendor: {booking.vendorId.name}</span>
                        <span className="mx-2 text-gray-400">•</span>
                        <Badge variant="outline" className={getStatusColor(booking.vendorApproval)}>
                          {booking.vendorApproval}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookingClick(booking);
                    }}
                  >
                    <Info className="h-4 w-4" />
                    <span className="sr-only">View details</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {selectedBooking && (
        <BookingDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          booking={selectedBooking}
        />
      )}
    </div>
  );
};

export default BookingsListAdmin;