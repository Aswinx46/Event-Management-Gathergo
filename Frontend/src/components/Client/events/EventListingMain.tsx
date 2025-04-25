import React, { useState } from 'react'
import EventList from '../../other components/events/EventList'
import { useFindEvents, useFindEventsBasedOnCategory } from '@/hooks/ClientCustomHooks'
import Pagination from '@/components/other components/Pagination'
import FilterComponent from '@/components/other components/Filter'

function EventListingMain() {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [selelctedSort, setSelectedSort] = useState<string>('a-z')

    const findEvents = useFindEvents(currentPage)
    const events = findEvents.data?.events
    const totalPages = findEvents.data?.totalPages
    const [selectedCategory, setSelectedCategory] = useState<string>('')

    const categories = [
        { title: "Conference" },
        { title: "Workshop" },
        { title: "Concert" },
        { title: "Festival" },
        { title: "Networking" },
        { title: "Exhibition" },
        { title: "Sports" },
        { title: "Other" },

    ];
    const filterFields = [
        {
            key: "category",
            label: "Category",
            options: categories.map((item) => ({
                value: item.title.toLowerCase(),  // safe for filtering/query
                label: item.title
            }))
        }
    ]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sortOptions = [
        { key: "a-z", label: "A - Z" },
        { key: "z-a", label: "Z - A" },
        { key: "price-low-high", label: "Price: Low to High" },
        { key: "price-high-low", label: "Price: High to Low" },
        { key: "newest", label: "Newest" },
        { key: "oldest", label: "Oldest" }
    ]
    const findEventsBasedOnCategory = useFindEventsBasedOnCategory(selectedCategory, currentPage, selelctedSort)
    const filteredEvents = findEventsBasedOnCategory.data?.events
    const filteredTotalPages = findEventsBasedOnCategory.data?.totalPages
    const handleClearField = () => {
        setSelectedCategory('')
    }
    const handleClearSort = () => {
        setSelectedSort('')
    }
    const handleSortSelect = (key: string) => {
        console.log(key)
        setSelectedSort(key)
    }

    const handleFilterChange = (filters: Record<string, string>) => {
        console.log(filters)
        setSelectedCategory(filters.category)
    }

    return (
        <div className='bg-black h-screen'>
            <FilterComponent filterFields={filterFields} onFilterChange={handleFilterChange} onSortChange={handleSortSelect} sortOptions={sortOptions} onClearFilter={handleClearField} onClearSort={handleClearSort} />
            <EventList events={filteredEvents || events} isLoading={findEvents.isLoading} currentPage={currentPage} />
            <Pagination current={currentPage} setPage={setCurrentPage} total={totalPages || filteredTotalPages} />
        </div>
    )
}

export default EventListingMain
