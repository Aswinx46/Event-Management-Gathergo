import EventList from '@/components/other components/events/EventList'
import Pagination from '@/components/other components/Pagination'
import { useFindAllEventsVendorSide } from '@/hooks/VendorCustomHooks'
import  { useState } from 'react'

function EventlistingInVendor() {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const findEventsInVendor = useFindAllEventsVendorSide(currentPage)
    const events = findEventsInVendor.data?.events
    const totalPages = findEventsInVendor.data?.totalPages
    return (
        <div>
            <EventList events={events} isLoading={findEventsInVendor.isLoading} />
            <Pagination current={currentPage} setPage={setCurrentPage} total={totalPages} />
        </div>
    )
}

export default EventlistingInVendor
