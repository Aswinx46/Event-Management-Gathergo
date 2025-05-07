"use client"

import Pagination from "@/components/other components/Pagination"
import { TicketList } from "@/components/Vendor/ticketDetailsWithUser/TicketLisitng"
import { useTicketDetailsWithUser } from "@/hooks/VendorCustomHooks"
import { RootState } from "@/store/store"
import type { TicketAndUserDTO } from "@/types/ticketDetailsWIthUser"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"


export default function TicketsPage() {
    const location = useLocation()
    const eventId = location.state.eventId
    // const [tickets, setTickets] = useState<TicketAndUserDTO[]>([])

    const [currentPage, setCurrentPage] = useState<number>(1)
    const vendorId = useSelector((state: RootState) => state.vendorSlice.vendor?._id)
    const findTicketDetails = useTicketDetailsWithUser(eventId, vendorId!, currentPage)
    const tickets: TicketAndUserDTO[] = findTicketDetails.data?.ticketAndEventDetails
    const totalPages = findTicketDetails.data?.totalPages
    if (findTicketDetails.isLoading) {
        return (
            <div className="container mx-auto py-12 flex justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading tickets...</p>
                </div>
            </div>
        )
    }

    return (
        <>
            {tickets && <TicketList tickets={tickets} />}
            <Pagination current={currentPage} setPage={setCurrentPage} total={totalPages} />
        </>
    )
}
