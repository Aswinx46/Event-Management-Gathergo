import React, { useState } from 'react'
import EventList from '../../other components/events/EventList'
import { useFindEvents } from '@/hooks/ClientCustomHooks'
import Pagination from '@/components/other components/Pagination'

function EventListingMain() {
    const [currentPage, setCurrentPage] = useState<number>(1)

    const findEvents = useFindEvents(currentPage)
    const events = findEvents.data?.events
    const totalPages = findEvents.data?.totalPages
    return (
        <div className='bg-black h-screen'>
            <EventList events={events} isLoading={findEvents.isLoading} currentPage={currentPage} />
            <Pagination current={currentPage} setPage={setCurrentPage} total={totalPages}/>
        </div>
    )
}

export default EventListingMain
