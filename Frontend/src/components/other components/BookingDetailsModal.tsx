import React, { useState } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Calendar,
    Clock,
    Mail,
    Phone,
    CreditCard,

} from "lucide-react";
import { useApproveBooking, useRejectBooking, useUpdateBookingAsComplete } from "@/hooks/VendorCustomHooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import RejectionReasonModal from "./RejectionReasonModal";
import { useNavigate } from "react-router-dom";


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
export interface BookingDetails {
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



interface BookingDetailsModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    booking: BookingDetails | null;
}


// Helper function to format phone number
const formatPhoneNumber = (phone: number): string => {
    const phoneString = phone?.toString();
    if (phoneString?.length === 10) {
        return `(${phoneString.slice(0, 3)}) ${phoneString.slice(3, 6)}-${phoneString.slice(6)}`;
    }
    return phoneString;
};

// Helper function to get status badge style
const getStatusStyle = (status: BookingDetails["status"] | BookingDetails["paymentStatus"]) => {
    switch (status) {
        case "Confirmed":
            return "bg-gray-700 text-white";
        case "Pending":
            return "bg-gray-500 text-white";
        case "Completed":
            return "bg-black text-white";
        case "Paid":
            return "bg-black text-white";
        case "Cancelled":
            return "bg-gray-300 text-black";
        default:
            return "bg-gray-100 text-black";
    }
};

const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({
    isOpen,
    setIsOpen,
    booking
}) => {
    const navigate = useNavigate()

    const updateBookingStatus = useUpdateBookingAsComplete()
    const approveBooking = useApproveBooking()
    const rejectBooking = useRejectBooking()
    const vendorId = useSelector((state: RootState) => state.vendorSlice.vendor?._id)
    const clientId = useSelector((state: RootState) => state.clientSlice.client?._id)
    const queryClient = useQueryClient()
    const [rejectionModal, setRejectionModal] = useState<boolean>(false)
    const [rejectionReason, setRejectionReason] = useState<string>('')
    const [rejectingBookingId, setRejectingBookingId] = useState<string>('')
    if (!booking) return null;

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.4 }
        }
    };

    // const bookingDate = new Date(booking.date);
    // const timeAgo = formatDistanceToNow(bookingDate, { addSuffix: true });



    const handleApproveBooking = (bookingId: string) => {

        if (vendorId && bookingId) {

            approveBooking.mutate(bookingId, {
                onSuccess: (data) => {
                    toast.success(data.message)
                    queryClient.invalidateQueries({ queryKey: ['Bookings-in-vendor', vendorId] })
                    setIsOpen(false)
                },
                onError: (err) => {
                    toast.error(err.message)
                }
            })
        }
    }
    const handleOnClose = () => setRejectionModal(false)

    const handleChatNavigate = () => {
        if (booking.client?.email) {
            navigate('/vendor/chats/messages', {
                state: {
                    clientId: booking.client._id,
                    vendorId: vendorId
                }
            })
        } else {
            navigate('/profile/chat/messages', {
                state: {
                    clientId: clientId,
                    vendorId: booking.vendor._id
                }
            })
        }
    }

    const handleDecline = (bookindId: string) => {
        setRejectingBookingId(bookindId)
        setRejectionModal(true)
        // setIsOpen(false)
    }

    const handleReject = () => {

        rejectBooking.mutate({ bookingId: rejectingBookingId, rejectionReason }, {
            onSuccess: (data) => {
                toast.success(data.message)
                queryClient.invalidateQueries({ queryKey: ['Bookings-in-vendor', vendorId] })
                setRejectionModal(false)
            },
            onError: (err) => {
                toast.success(err.message)
            }
        })
    }

    const handleChangeBookingStatus = (booking: BookingDetails) => {
        const newStatus = booking.status === "Pending" ? "Completed" : "Pending";

        updateBookingStatus.mutate(
            { bookingId: booking._id, status: newStatus },
            {
                onSuccess: ({ message }) => {
                    toast.success(message)
                    queryClient.invalidateQueries({ queryKey: ['Bookings-in-vendor', vendorId] })
                    setIsOpen(false)
                },
                onError: (err) => {
                    console.error(err);
                    toast.error(err.message);
                },
            }
        );
    };
    const handleBookingPayment = (booking: BookingDetails) => {

        navigate('/profile/confirmBookingPayment', {
            state: {
                booking
            }
        })

    }
    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
            <DialogContent className="max-w-md max-h-[80vh] bg-gray-900 border border-gray-800 text-white p-0 rounded-xl overflow-hidden">
                <div className="custom-scrollbar overflow-y-auto max-h-[calc(80vh-4rem)]">
                    {rejectionModal && <RejectionReasonModal isOpen={rejectionModal} onClose={handleOnClose} onSubmit={handleReject} rejectionReason={rejectionReason} setRejectionReason={setRejectionReason} />}
                    <DialogHeader className="bg-black py-6 px-5">
                        <DialogTitle className="text-xl font-bold flex items-center justify-between">
                            <span>Booking Details</span>
                            <span className={`text-xs px-3 py-1 rounded-full ${getStatusStyle(booking.status)}`}>
                                {booking.status}
                            </span>
                        </DialogTitle>
                    </DialogHeader>
                    <motion.div
                        className="p-6 space-y-5"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        {/* Service Details */}
                        <motion.div variants={itemVariants} className="space-y-1">
                            <h3 className="text-lg font-bold text-white">{booking.service.serviceTitle}</h3>
                            <p className="text-gray-400 text-sm">{booking.service.serviceDescription}</p>
                        </motion.div>

                        {/* Date and Time */}
                        <motion.div variants={itemVariants} className="bg-gray-800 p-4 rounded-lg">
                            <div className="flex flex-col gap-2">
                                {Array.isArray(booking.date) &&
                                    booking.date.map((date, index) => {
                                        const dateObj = new Date(date);
                                        return (
                                            <div key={index} className="flex items-center gap-3">
                                                <Calendar className="h-5 w-5 text-gray-400" />
                                                <div>
                                                    <p className="text-white">
                                                        {dateObj.toLocaleDateString("en-US", {
                                                            weekday: "long",
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric"
                                                        })}
                                                    </p>
                                                    <p className="text-gray-400 text-sm">
                                                        {formatDistanceToNow(dateObj, { addSuffix: true })}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                            <div className="flex items-center gap-3 mt-3">
                                <Clock className="h-5 w-5 text-gray-400" />
                                <p className="text-white">{booking.service.serviceDuration}</p>
                            </div>
                        </motion.div>

                        {/* Vendor Info */}
                        <motion.div variants={itemVariants} className="border border-gray-800 rounded-lg p-4 flex items-center gap-4">
                            {(booking?.vendor?.profileImage || booking.client?.profileImage) &&
                                <img
                                    src={booking.vendor?.profileImage || booking.client?.profileImage}
                                    // alt={booking.vendor?.name || booking.client?.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                            }
                            <div>
                                <p className="text-white font-medium">{booking?.vendor?.name || booking?.client?.name}</p>
                                <p className="text-gray-400 text-sm">{booking?.vendor?.email || booking.client.email}</p>
                                <p className="text-gray-400 text-sm">{formatPhoneNumber(booking?.vendor?.phone || booking?.client?.phone)}</p>
                            </div>
                        </motion.div>

                        {/* Customer Info */}
                        <motion.div variants={itemVariants} className="space-y-3">
                            <h3 className="text-sm font-medium text-gray-400">{booking?.client?.email ? 'Client Contact Information' : 'Your Contact Information'}</h3>
                            <div className="grid grid-cols-1 gap-3">
                                <div className="flex items-center gap-3">
                                    <Mail className="h-4 w-4 text-gray-500" />
                                    <p className="text-white">{booking.email}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="h-4 w-4 text-gray-500" />
                                    <p className="text-white">{formatPhoneNumber(booking.phone)}</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Payment Details */}
                        <motion.div variants={itemVariants} className="flex justify-between items-center border-t border-gray-800 pt-4 mt-4">
                            <div className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-400">Payment Status</p>
                                    <span className={`text-xs px-2 py-0.5 rounded-full inline-block mt-1 ${getStatusStyle(booking.paymentStatus)}`}>
                                        {booking.paymentStatus}
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-400">Total Amount</p>
                                <p className="text-xl font-bold text-white">₹{booking.service.servicePrice.toLocaleString()}</p>
                            </div>
                        </motion.div>

                        {/* Booking ID */}
                        <motion.div variants={itemVariants} className="text-center pt-2 border-t border-gray-800">
                            <p className="text-xs text-gray-500">Booking ID: {booking._id}</p>
                        </motion.div>
                        {booking?.client?.email && booking?.vendorApproval == 'Pending' &&
                            <motion.div variants={itemVariants} className="text-center pt-2 border-t flex justify-center gap-3 border-gray-800">
                                <Button onClick={() => handleApproveBooking(booking._id)} className="bg-green-500">{approveBooking.isPending ? 'Approving' : 'Approve'}</Button>
                                <Button onClick={() => handleDecline(booking._id)} className="bg-red-600">DECLINE</Button>
                            </motion.div>}

                        {booking?.client?.email && booking.vendorApproval == 'Approved' && booking.paymentStatus !== 'Successfull' &&
                            < motion.div variants={itemVariants} className="text-center pt-2 border-t flex justify-center gap-3 border-gray-800">
                                <Button onClick={() => handleChangeBookingStatus(booking)} className={booking.status == 'Pending' ? 'bg-green-500' : 'bg-red-600'}>{booking.status == 'Pending' ? 'Mark as Complete' : 'Mark as not Complete'}</Button>
                            </motion.div>}
                    </motion.div>

                    {booking.rejectionReason && <motion.div variants={itemVariants} className="space-y-3">
                        <h3 className="text-sm font-medium text-gray-400">'Rejection Reason</h3>
                        <div className="grid grid-cols-1 gap-3">
                            <div className="flex items-center gap-3">
                                <p className="text-white">{booking.rejectionReason}</p>
                            </div>
                        </div>
                    </motion.div>}
                    <div className="flex justify-center">
                        {booking.status == 'Completed' && booking.paymentStatus !== 'Successfull' && booking.paymentStatus !== 'Refunded' && !booking?.client?.email && < Button onClick={() => handleBookingPayment(booking)} className=" bg-green-500">Pay now</Button>}
                        {booking.vendorApproval == 'Approved' && <Button onClick={handleChatNavigate} className="bg-purple-400">CHAT NOW</Button>}
                    </div>
                    <DialogFooter className="bg-gray-900 p-4  border-t border-gray-800">
                        <Button
                            onClick={() => setIsOpen(false)}
                            className="w-full bg-black hover:bg-gray-800 text-white border border-gray-800"
                        >
                            Close
                        </Button>

                    </DialogFooter>

                </div>
            </DialogContent>
        </Dialog >
    );
};

export default BookingDetailsModal;
