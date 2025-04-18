import EventList from '@/components/other components/events/EventList'
import Pagination from '@/components/other components/Pagination'
import { useFindAllEventsVendorSide } from '@/hooks/VendorCustomHooks'
import { RootState } from '@/store/store'
import { useState } from 'react'
import { useSelector } from 'react-redux'

function EventlistingInVendor() {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const vendorId = useSelector((state: RootState) => state.vendorSlice.vendor?._id)
    const findEventsInVendor = useFindAllEventsVendorSide(vendorId!, currentPage)
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
