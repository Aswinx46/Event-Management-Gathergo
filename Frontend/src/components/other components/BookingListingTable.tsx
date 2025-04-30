import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Calendar, Phone, Mail, Clock } from "lucide-react";
import BookingDetailsModal from "./BookingDetailsModal";

interface Service {
  serviceTitle: string;
  serviceDescription: string;
  serviceDuration: string;
  servicePrice: number;
}

interface Vendor {
  _id: string;
  name: string;
  email: string;
  phone: number;
  profileImage: string;
}

interface Client {
  _id: string;
  name: string;
  email: string;
  phone: number;
  profileImage: string;
}

export interface Booking {
  _id: string;
  date: string[];
  email: string;
  phone: number;
  paymentStatus: string;
  status: string;
  service: Service;
  vendor: Vendor;
  client: Client
  vendorApproval: string
  rejectionReason?: string
}

interface BookingListingTableProps {
  bookings: Booking[];
}

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

const BookingListingTable: React.FC<BookingListingTableProps> = ({ bookings = [] }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedBooking, setSelectedBooking] = useState<Booking>()
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const handleDetailedView = (bookingId: string) => {

    const selectedOne = bookings.find((booking) => booking._id == bookingId)
    console.log(selectedOne)
    setSelectedBooking(selectedOne)
    setIsOpen(true)
  }

  return (
    <motion.div
      className="w-full overflow-x-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Card className="border-none shadow-lg bg-white min-w-[800px]">
        <CardHeader className="bg-black text-white rounded-t-xl space-y-2">
          <CardTitle className="text-2xl font-bold tracking-tight">My Bookings</CardTitle>
          <CardDescription className="text-gray-300 font-medium">
            View and manage all your bookings in one place
          </CardDescription>
        </CardHeader>
        {isOpen && <BookingDetailsModal booking={selectedBooking!} isOpen={isOpen} setIsOpen={setIsOpen} />}
        <CardContent className="p-4 md:p-6">
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-black hover:bg-black/90">
                  <TableHead className="text-white font-medium">Service</TableHead>
                  <TableHead className="text-white font-medium">Vendor</TableHead>
                  <TableHead className="text-white font-medium">Date</TableHead>
                  <TableHead className="text-white font-medium">Contact</TableHead>
                  <TableHead className="text-white font-medium">Duration & Price</TableHead>
                  <TableHead className="text-white font-medium">Status</TableHead>
                  <TableHead className="text-white font-medium">PaymentStatus</TableHead>
                  <TableHead className="text-white font-medium">VendorStatus</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking, index) => (
                  <motion.tr
                    key={booking._id}
                    variants={itemVariants}
                    onClick={() => handleDetailedView(booking._id)}
                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}  hover:bg-gray-100 transition-colors duration-150 ${booking.status == 'Cancelled' ? 'bg-red-300' : 'bg-white'}`}
                  >
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-black">{booking?.service?.serviceTitle}</p>
                        {/* <p className="text-sm text-gray-500 line-clamp-2">{booking?.service?.serviceDescription}</p> */}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={booking.vendor?.profileImage || booking.client?.profileImage}
                          alt={booking.vendor?.name || booking.client?.profileImage}
                          className="w-10 h-10 rounded-full object-cover"
                        />?
                        <div>
                          <p className="font-medium">{booking?.vendor?.name || booking?.client?.name}</p>
                          <p className="text-sm text-gray-500">{booking?.vendor?.email || booking.client.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {Array.isArray(booking.date) &&
                        booking.date.map((d, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span>{formatDate(d)}</span>
                          </div>
                        ))}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span>{booking.phone}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{booking?.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{booking?.service?.serviceDuration}</span>
                        </div>
                        <p className="font-semibold text-black">
                          ₹{booking?.service?.servicePrice}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-black">
                          {booking?.status}
                        </span>

                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <span className="block px-2.5 py-1 rounded-full text-center text-xs font-medium bg-gray-100 text-black">
                          {booking?.paymentStatus}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <span
                          className={`block px-2.5 py-1 rounded-full text-center text-xs font-medium
                              ${booking?.vendorApproval === 'Approved'
                              ? 'bg-green-100 text-green-800'
                              : booking?.vendorApproval === 'Rejected'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                        >
                          {booking?.vendorApproval}
                        </span>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
                {(!bookings || bookings.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-gray-500">
                      No bookings found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BookingListingTable;