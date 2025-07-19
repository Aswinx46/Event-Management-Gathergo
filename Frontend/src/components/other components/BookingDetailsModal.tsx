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
import { useAddReview, useCancelBooking } from "@/hooks/ClientCustomHooks";
import ConfirmModal from "./ConfirmationModal";
import AddReviewModal from "./review/AddReview";
import { ReviewEntity } from "@/types/ReviewType";
import { CloudinaryPreset } from "@/utils/cloudinaryPresetFile";
import { Booking } from "../../types/BookingDetailsModalTypes";
import OvertimeModal, { OvertimeRequest } from "./OvertimeMoneyRequestModal";

interface BookingDetailsModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    booking: Booking | null;
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
const getStatusStyle = (status: Booking["status"] | Booking["paymentStatus"]) => {
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
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false)
    const navigate = useNavigate()
    const cancelBooking = useCancelBooking()
    const updateBookingStatus = useUpdateBookingAsComplete()
    const approveBooking = useApproveBooking()
    const rejectBooking = useRejectBooking()
    const vendorId = useSelector((state: RootState) => state.vendorSlice.vendor?._id)
    const clientId = useSelector((state: RootState) => state.clientSlice.client?._id)
    const queryClient = useQueryClient()
    const [rejectionModal, setRejectionModal] = useState<boolean>(false)
    const [rejectionReason, setRejectionReason] = useState<string>('')
    const [rejectingBookingId, setRejectingBookingId] = useState<string>('')
    const [cancelBookingId, setCancelBookingId] = useState<string>('')
    const [showReviewModal, setShowReviewModal] = useState<boolean>(false)
    const [newAmount, setNewAmount] = useState<number>(booking?.amount || 0)
    const [newOverTimeRate, setNewOverTimeRate] = useState<number | null>(null)
    const [showModalForExtraPayment, setShowModalForExtraPayment] = useState<boolean>(false)
    const [extraHour, setExtraHour] = useState<number>(0)
    const addReview = useAddReview()
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

    const cancelMessage = 'This action cannot be undone, and the service will no longer be available for booking.'
    const handleCancelBooking = () => {
        cancelBooking.mutate(cancelBookingId, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['Bookings in client'] })
                toast.success('Booking cancelled')
                setShowConfirmModal(false)
                setIsOpen(false)

            },
            onError: (err) => {
                toast.error(err.message)
            }
        })
    }
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

            navigate('/vendor/chats', {
                state: {
                    clientId: booking.client._id,
                    vendorId: vendorId,
                    selectedChat: true
                }
            })
        } else {

            navigate('/profile/chats', {
                state: {
                    clientId: clientId,
                    vendorId: booking.vendor._id,
                    selectedChat: true
                }
            })
        }
    }

    const handleDecline = (bookindId: string) => {
        setRejectingBookingId(bookindId)
        setRejectionModal(true)
        // setIsOpen(false)
    }



    const handleReviewSubmit = (review: ReviewEntity) => {
        addReview.mutate(review, {
            onSuccess: () => {
                toast.success('Review Added')
                setIsOpen(false)
            },
            onError: (err) => {
                toast.error(err.message)

            }
        })
    }

    const handleReject = () => {

        rejectBooking.mutate({ bookingId: rejectingBookingId, rejectionReason }, {
            onSuccess: (data) => {
                toast.success(data.message)
                queryClient.invalidateQueries({ queryKey: ['Bookings-in-vendor', vendorId] })
                setRejectionModal(false)
                setIsOpen(false)
            },
            onError: (err) => {
                toast.success(err.message)
            }
        })
    }

    const handleChangeBookingStatus = (booking: Booking) => {
        const newStatus = booking.status === "Pending" ? "Completed" : "Pending";
        console.log('this is the booking data while payment', booking)
        updateBookingStatus.mutate(
            { bookingId: booking._id, status: newStatus, amount: newAmount, extraHour: extraHour },
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

    const handleExtraPayment = (data: OvertimeRequest) => {
        setNewOverTimeRate(data.hours * data.hourlyRate)
        setNewAmount((prev) => prev + data.hours * data.hourlyRate)
        setExtraHour(data.hours)
    }

    const handleBookingPayment = (booking: Booking) => {
        navigate('/profile/confirmBookingPayment', {
            state: {
                booking
            }
        })

    }
    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
            <DialogContent className="max-w-md max-h-[80vh] bg-[#1a1a1a] border border-[#333] text-white p-0 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)]">
                <div className="custom-scrollbar overflow-y-auto max-h-[calc(80vh-4rem)]">
                    {showReviewModal && <AddReviewModal isOpen={showReviewModal} onClose={() => setShowReviewModal(false)} reviewerId={clientId!} targetId={booking.service._id} targetType='service' onSubmit={handleReviewSubmit} />}
                    {showModalForExtraPayment && <OvertimeModal isOpen={showModalForExtraPayment} onClose={() => setShowModalForExtraPayment(false)} onSubmit={handleExtraPayment} overTimeRate={booking.service.additionalHourFee} currentAmount={booking.service.servicePrice} />}
                    {showConfirmModal && <ConfirmModal content={cancelMessage} isOpen={showConfirmModal} onCancel={() => setShowConfirmModal(false)} onConfirm={handleCancelBooking} />}
                    {rejectionModal && <RejectionReasonModal isOpen={rejectionModal} onClose={handleOnClose} onSubmit={handleReject} rejectionReason={rejectionReason} setRejectionReason={setRejectionReason} />}
                    <DialogHeader className="bg-[#111] py-6 px-5 border-b border-[#333]">
                        <DialogTitle className="text-xl font-bold flex items-center justify-between">
                            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Booking Details</span>
                            <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${getStatusStyle(booking.status)}`}>
                                {booking.status}
                            </span>
                        </DialogTitle>
                    </DialogHeader>
                    <motion.div
                        className="p-6 space-y-6"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        {/* Service Details */}
                        <motion.div variants={itemVariants} className="space-y-2 bg-[#222] p-4 rounded-xl border border-[#333]">
                            <h3 className="text-lg font-bold text-white">{booking.service.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{booking.service.serviceDescription}</p>
                        </motion.div>

                        {/* Date and Time */}
                        <motion.div variants={itemVariants} className="bg-[#222] p-5 rounded-xl border border-[#333]">
                            <div className="flex flex-col gap-3">
                                {Array.isArray(booking.date) &&
                                    booking.date.map((date, index) => {
                                        const dateObj = new Date(date);
                                        return (
                                            <div key={index} className="flex items-center gap-4">
                                                <div className="bg-[#333] p-2 rounded-lg">
                                                    <Calendar className="h-5 w-5 text-blue-400" />
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">
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
                            <div className="flex items-center gap-4 mt-4">
                                <div className="bg-[#333] p-2 rounded-lg">
                                    <Clock className="h-5 w-5 text-blue-400" />
                                </div>
                                <p className="text-white font-medium">{booking.service.serviceDuration}</p>
                            </div>
                        </motion.div>

                        {/* Vendor Info */}
                        <motion.div variants={itemVariants} className="bg-[#222] p-5 rounded-xl border border-[#333] flex items-center gap-4">
                            {(booking?.vendor?.profileImage || booking.client?.profileImage) &&
                                <div className="relative">
                                    <img
                                        src={CloudinaryPreset + booking.vendor?.profileImage || booking.client?.profileImage}
                                        className="w-14 h-14 rounded-xl object-cover border-2 border-blue-400"
                                    />
                                    <div className="absolute -bottom-1 -right-1 bg-blue-400 w-4 h-4 rounded-full border-2 border-[#222]"></div>
                                </div>
                            }
                            <div>
                                <p className="text-white font-semibold text-lg">{booking?.vendor?.name || booking?.client?.name}</p>
                                <p className="text-gray-400 text-sm">{booking?.vendor?.email || booking.client.email}</p>
                                <p className="text-gray-400 text-sm">{formatPhoneNumber(booking?.vendor?.phone || booking?.client?.phone)}</p>
                            </div>
                        </motion.div>

                        {/* Customer Info */}
                        <motion.div variants={itemVariants} className="bg-[#222] p-5 rounded-xl border border-[#333]">
                            <h3 className="text-sm font-medium text-blue-400 mb-4">{booking?.client?.email ? 'Client Contact Information' : 'Your Contact Information'}</h3>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="bg-[#333] p-2 rounded-lg">
                                        <Mail className="h-4 w-4 text-blue-400" />
                                    </div>
                                    <p className="text-white">{booking.email}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="bg-[#333] p-2 rounded-lg">
                                        <Phone className="h-4 w-4 text-blue-400" />
                                    </div>
                                    <p className="text-white">{formatPhoneNumber(booking.phone)}</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Payment Details */}
                        <motion.div variants={itemVariants} className="bg-[#222] p-5 rounded-xl border border-[#333]">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="bg-[#333] p-2 rounded-lg">
                                        <CreditCard className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">Payment Status</p>
                                        <span className={`text-xs px-2 py-1 rounded-full inline-block mt-1 font-medium ${getStatusStyle(booking.paymentStatus)}`}>
                                            {booking.paymentStatus}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 text-xl font-bold text-right">
                                    <p className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                        ₹{booking.amount.toLocaleString()}
                                    </p>

                                    {newOverTimeRate && (
                                        <p className="text-sm text-gray-500">
                                            + Overtime price: ₹{newOverTimeRate.toLocaleString()}
                                        </p>
                                    )}

                                    {newOverTimeRate && (
                                        <p className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                                            Total: ₹{(booking.amount + newOverTimeRate).toLocaleString()}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        {/* Booking ID */}
                        <motion.div variants={itemVariants} className="text-center pt-2">
                            <p className="text-xs text-gray-500">Booking ID: {booking._id}</p>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div variants={itemVariants} className="flex flex-wrap gap-3 justify-center pt-4">
                            {booking?.client?.email && booking?.vendorApproval == 'Pending' && (
                                <>
                                    <Button
                                        onClick={() => handleApproveBooking(booking._id)}
                                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2.5 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                                    >
                                        {approveBooking.isPending ? 'Approving...' : 'Approve'}
                                    </Button>
                                    <Button
                                        onClick={() => handleDecline(booking._id)}
                                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2.5 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                                    >
                                        Decline
                                    </Button>
                                </>
                            )}

                            {booking?.client?.email && booking.vendorApproval == 'Approved' && booking.paymentStatus !== 'Successfull' && booking.status === 'Pending' && (
                                <div className="flex gap-4">
                                    <Button
                                        onClick={() => setShowModalForExtraPayment(true)}
                                        className={`${booking.status == 'Pending'
                                            ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                                            : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'} 
                                        text-white px-6 py-2.5 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg`}
                                    >
                                        {booking.status == 'Pending' && 'Add Overtime Price'}
                                    </Button>

                                    <Button
                                        onClick={() => handleChangeBookingStatus(booking)}
                                        className={`${booking.status == 'Pending'
                                            ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                                            : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'} 
                                        text-white px-6 py-2.5 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg`}
                                    >
                                        {booking.status == 'Pending' && 'Mark as Complete'}
                                    </Button>

                                </div>

                            )}

                            {booking.status == 'Completed' && booking.paymentStatus == 'Successfull' && (
                                <Button
                                    onClick={() => setShowReviewModal(true)}
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2.5 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                                >
                                    Add Review
                                </Button>
                            )}

                            {booking.status == 'Completed' && booking.paymentStatus !== 'Successfull' && booking.paymentStatus !== 'Refunded' && !booking?.client?.email && (
                                <Button
                                    onClick={() => handleBookingPayment(booking)}
                                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2.5 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                                >
                                    Pay Now
                                </Button>
                            )}

                            {booking.vendorApproval == 'Approved' && (
                                <Button
                                    onClick={handleChatNavigate}
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2.5 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                                >
                                    Chat Now
                                </Button>
                            )}

                            {booking.paymentStatus == 'Pending' && !booking?.client?.email && booking.status == 'Pending' && (
                                <Button
                                    onClick={() => { setCancelBookingId(booking._id); setShowConfirmModal(true) }}
                                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2.5 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                                >
                                    Cancel Booking
                                </Button>
                            )}
                        </motion.div>

                        {booking.rejectionReason && (
                            <motion.div variants={itemVariants} className="bg-red-900/20 p-5 rounded-xl border border-red-800">
                                <h3 className="text-sm font-medium text-red-400 mb-3">Rejection Reason</h3>
                                <div className="grid grid-cols-1 gap-3">
                                    <div className="flex items-center gap-3">
                                        <p className="text-white">{booking.rejectionReason}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>

                    <DialogFooter className="bg-[#111] p-4 border-t border-[#333]">
                        <Button
                            onClick={() => setIsOpen(false)}
                            className="w-full bg-[#222] hover:bg-[#333] text-white border border-[#333] rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                        >
                            Close
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BookingDetailsModal;
