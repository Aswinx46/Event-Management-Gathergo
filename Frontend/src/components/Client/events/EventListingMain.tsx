import React, { useState } from 'react'
import EventList from '../../other components/events/EventList'
import { useFindEvents, useFindEventsBasedOnCategory } from '@/hooks/ClientCustomHooks'
import Pagination from '@/components/other components/Pagination'
import FilterComponent from '@/components/other components/Filter'
import SortComponent from '@/components/other components/SortComponent'

function EventListingMain() {
    const [currentPage, setCurrentPage] = useState<number>(1)

    const findEvents = useFindEvents(currentPage)
    const events = findEvents.data?.events
    const totalPages = findEvents.data?.totalPages
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    interface categoryType {
        title: string
    }
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sortOptions = [
        { key: "a-z", label: "A - Z" },
        { key: "z-a", label: "Z - A" },
        { key: "price-low-high", label: "Price: Low to High" },
        { key: "price-high-low", label: "Price: High to Low" },
        { key: "newest", label: "Newest" },
        { key: "oldest", label: "Oldest" }
    ]
    const handleClearItem = () => {
        setSelectedCategory('')
    }

    const handleSortSelect = (key: string) => {
        console.log(key)
    }

    // const findEventsBasedOnCategory=useFindEventsBasedOnCategory(selectedCategory,currentPage,)

    const handleSelectCategory = (category: categoryType) => {
        console.log(category)
        setSelectedCategory(category.title)
    }
    return (
        <div className='bg-black h-screen'>
            <FilterComponent handleClearAll={handleClearItem} items={categories} onSelect={handleSelectCategory} />
            <SortComponent onSortSelect={handleSortSelect} options={sortOptions} />
            <EventList events={events} isLoading={findEvents.isLoading} currentPage={currentPage} />
            <Pagination current={currentPage} setPage={setCurrentPage} total={totalPages} />
        </div>
    )
}

export default EventListingMain
