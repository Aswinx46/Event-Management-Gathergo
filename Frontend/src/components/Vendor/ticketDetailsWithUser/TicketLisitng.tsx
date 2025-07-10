"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { TicketAndUserDTO } from "@/types/ticketDetailsWIthUser"
import { TicketDetailModal } from "./TicketDetailsModal"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"


interface TicketListProps {
  tickets: TicketAndUserDTO[]
}

export function TicketList({ tickets }: TicketListProps) {
  const [selectedTicket, setSelectedTicket] = useState<TicketAndUserDTO | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.ticketId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.clientId.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.eventId.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Ticket Management</h1>
        <p className="text-gray-500">Manage and view all ticket details</p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search by ticket ID, customer name or event..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTickets.map((ticket, index) => (
          <motion.div
            key={ticket.ticketId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer border border-gray-200"
            onClick={() => setSelectedTicket(ticket)}
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg truncate">{ticket.eventId.title}</h3>
                  <p className="text-sm text-gray-500 truncate">ID: {ticket.ticketId}</p>
                </div>
                <Badge className={getStatusColor(ticket.ticketStatus)}>
                  {ticket.ticketStatus.charAt(0).toUpperCase() + ticket.ticketStatus.slice(1)}
                </Badge>
              </div>

              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 mr-2">
                  {ticket.clientId.profileImage ? (
                    <img
                      src={ticket.clientId.profileImage || "/placeholder.svg"}
                      alt={ticket.clientId.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600">
                      {ticket.clientId.name.charAt(0)}
                    </div>
                  )}
                </div>
                <span className="text-sm font-medium">{ticket.clientId.name}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                <div>
                  <p className="text-gray-500">Amount</p>
                  <p className="font-medium">₹{ticket.amount}</p>
                </div>
                <div>
                  <p className="text-gray-500">Tickets</p>
                  <p className="font-medium">{ticket.ticketCount}</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Badge variant="outline" className={getPaymentStatusColor(ticket.paymentStatus)}>
                  {ticket.paymentStatus}
                </Badge>
                {ticket.eventId.schedule && ticket.eventId.schedule.length > 0 && ticket.eventId.schedule.map((item) => (
                  <p className="text-xs text-gray-500">
                    {new Date(item.date).toDateString()}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredTickets.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <p className="text-gray-500">No tickets found matching your search criteria.</p>
        </motion.div>
      )}

      {selectedTicket && (
        <TicketDetailModal ticket={selectedTicket} isOpen={!!selectedTicket} onClose={() => setSelectedTicket(null)} />
      )}
    </div>
  )
}
