"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { TicketAndUserDTO } from "@/types/ticketDetailsWIthUser"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Phone, Mail, QrCode, Ticket, DollarSign, AlertCircle } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TicketDetailModalProps {
    ticket: TicketAndUserDTO
    isOpen: boolean
    onClose: () => void
}

export function TicketDetailModal({ ticket, isOpen, onClose }: TicketDetailModalProps) {
    const [activeTab, setActiveTab] = useState("details")

    const getStatusColor = (status: "used" | "refunded" | "unused") => {
        switch (status) {
            case "used":
                return "bg-green-100 text-green-800"
            case "refunded":
                return "bg-red-100 text-red-800"
            case "unused":
                return "bg-blue-100 text-blue-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const getPaymentStatusColor = (status: "pending" | "successful" | "failed") => {
        switch (status) {
            case "successful":
                return "bg-green-100 text-green-800"
            case "failed":
                return "bg-red-100 text-red-800"
            case "pending":
                return "bg-yellow-100 text-yellow-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const getEventStatusColor = (status: "upcoming" | "completed" | "cancelled") => {
        switch (status) {
            case "upcoming":
                return "bg-blue-100 text-blue-800"
            case "completed":
                return "bg-green-100 text-green-800"
            case "cancelled":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-3xl h-[70vh] overflow-y-auto flex flex-col justify-start hide-scrollbar">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Ticket Details</DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="mt-4 flex flex-col ">
                    <TabsList className="grid grid-cols-3 mb-6">
                        <TabsTrigger value="details">Ticket Details</TabsTrigger>
                        <TabsTrigger value="event">Event Info</TabsTrigger>
                        <TabsTrigger value="customer">Customer</TabsTrigger>
                    </TabsList>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <TabsContent value="details" className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-semibold">{ticket.eventId.title}</h3>
                                        <p className="text-gray-500">Ticket ID: {ticket.ticketId}</p>
                                    </div>
                                    <Badge className={getStatusColor(ticket.ticketStatus)}>
                                        {ticket.ticketStatus.charAt(0).toUpperCase() + ticket.ticketStatus.slice(1)}
                                    </Badge>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <Ticket className="w-5 h-5 mr-2 text-gray-500" />
                                            <div>
                                                <p className="text-sm text-gray-500">Ticket Count</p>
                                                <p className="font-medium">{ticket.ticketCount}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <DollarSign className="w-5 h-5 mr-2 text-gray-500" />
                                            <div>
                                                <p className="text-sm text-gray-500">Total Amount</p>
                                                <p className="font-medium">₹{ticket.amount}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <AlertCircle className="w-5 h-5 mr-2 text-gray-500" />
                                            <div>
                                                <p className="text-sm text-gray-500">Payment Status</p>
                                                <Badge variant="outline" className={getPaymentStatusColor(ticket.paymentStatus)}>
                                                    {ticket.paymentStatus}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex justify-center mb-4">
                                            <QrCode className="w-6 h-6 text-gray-700" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm text-gray-500 mb-2">QR Code</p>
                                            {ticket.qrCodeLink ? (
                                                <img
                                                    src={ticket.qrCodeLink || "/placeholder.svg"}
                                                    alt="Ticket QR Code"
                                                    className="mx-auto max-w-[150px] max-h-[150px]"
                                                />
                                            ) : (
                                                <div className="bg-gray-200 w-[150px] h-[150px] mx-auto flex items-center justify-center">
                                                    <p className="text-gray-500 text-sm">QR Code not available</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="mt-6">
                                    <Button variant="outline" className="mr-2">
                                        Mark as Used
                                    </Button>
                                    <Button variant="outline" className="mr-2">
                                        Process Refund
                                    </Button>
                                    <Button>Download Ticket</Button>
                                </div> */}
                            </TabsContent>

                            <TabsContent value="event" className="space-y-4">
                                <div className="flex flex-col  gap-4">
                                    <div className="">
                                        {ticket.eventId.posterImage && ticket.eventId.posterImage.length > 0 ? (
                                            <img
                                                src={ticket.eventId.posterImage[0] || "/placeholder.svg"}
                                                alt={ticket.eventId.title}
                                                className="w-full h-[30vh] rounded-lg object-cover aspect-[3/4]"
                                            />
                                        ) : (
                                            <div className="w-full h-full aspect-[3/4] bg-gray-200 rounded-lg flex items-center justify-center">
                                                <p className="text-gray-500">No image available</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className=" space-y-4">
                                        <div>
                                            <h3 className="text-xl font-semibold">{ticket.eventId.title}</h3>
                                            <Badge className={getEventStatusColor(ticket.eventId.status)}>{ticket.eventId.status}</Badge>
                                        </div>

                                        <p className="text-gray-700">{ticket.eventId.description}</p>

                                        <div className="space-y-3">
                                            <div className="flex items-center">
                                                <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Date</p>
                                                    {ticket.eventId.schedule && ticket.eventId.schedule.length > 0 && ticket.eventId.schedule.map((item) => (
                                                        <p className="text-xs text-gray-500">
                                                            {new Date(item.date).toDateString()}
                                                        </p>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex items-center">
                                                <Clock className="w-5 h-5 mr-2 text-gray-500" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Time</p>

                                                    {ticket.eventId.schedule && ticket.eventId.schedule.length > 0 && ticket.eventId.schedule.map((item) => (
                                                        <p className="text-xs text-gray-500">
                                                            {`${item.startTime} to ${item.endTime}`}
                                                        </p>
                                                    ))}

                                                </div>
                                            </div>

                                            {ticket.eventId.address && (
                                                <div className="flex items-center">
                                                    <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Location</p>
                                                        <p className="font-medium">{ticket.eventId.address}</p>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex items-center">
                                                <DollarSign className="w-5 h-5 mr-2 text-gray-500" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Price Per Ticket</p>
                                                    <p className="font-medium">₹{ticket.amount}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="customer" className="space-y-4">
                                <div className="flex items-center mb-4">
                                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 mr-4">
                                        {ticket.clientId.profileImage ? (
                                            <img
                                                src={ticket.clientId.profileImage || "/placeholder.svg"}
                                                alt={ticket.clientId.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 text-xl">
                                                {ticket.clientId.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold">{ticket.clientId.name}</h3>
                                        <p className="text-gray-500">Customer ID: {ticket.clientId._id.toString()}</p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <Phone className="w-5 h-5 mr-2 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Phone</p>
                                            <p className="font-medium">{ticket.phone}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <Mail className="w-5 h-5 mr-2 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="font-medium">{ticket.email}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <Button variant="outline">Contact Customer</Button>
                                </div>
                            </TabsContent>
                        </motion.div>
                    </AnimatePresence>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
