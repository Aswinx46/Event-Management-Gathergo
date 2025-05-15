
import React, { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Info, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingDetailsModal from "./BookingDetailsModalAdmin";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BookingDetailsInAdminEntity as Booking } from "@/types/BookingDetailsAdmin";
import { useFindBookingsInAdmin } from "@/hooks/AdminCustomHooks";
import Pagination from "@/components/other components/Pagination";


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



const BookingsListAdmin: React.FC = () => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const findBookings = useFindBookingsInAdmin(currentPage)
  const bookings: Booking[] = findBookings?.data?.bookings
  const totalPages = findBookings?.data?.totalPages
  console.log(findBookings.data?.bookings)
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
        {bookings?.map((booking, index) => (
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
                        <span className="font-medium">{formatDate(new Date(booking.date[0]))}</span>
                        <span className="mx-2 text-gray-400">•</span>
                        {/* <Clock className="h-4 w-4 mr-1 text-gray-500" />
                        <span>{formatTime(new Date(booking.date[0]))}</span> */}
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
        {bookings?.length > 0 && < Pagination current={currentPage} setPage={setCurrentPage} total={totalPages} />}
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