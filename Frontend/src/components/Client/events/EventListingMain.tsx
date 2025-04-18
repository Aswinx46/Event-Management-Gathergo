import React, { useState } from 'react'
import EventList from './EventList'
import { useFindEvents } from '@/hooks/ClientCustomHooks'

function EventListingMain() {
    const [currentPage, setCurrentPage] = useState<number>(1)

    const findEvents = useFindEvents(currentPage)
    const events = findEvents.data?.events
    const totalPages = findEvents.data?.totalPages
    console.log(findEvents.data)
    return (
        <div className='bg-black'>
            <EventList events={events} isLoading={findEvents.isLoading} />
        </div>
    )
}

export default EventListingMain
