import React, { useState } from 'react'
import EventList from '../../other components/events/EventList'
import { useFindEvents, useFindEventsBasedOnCategory, useFindEventsOnQuery } from '@/hooks/ClientCustomHooks'
import Pagination from '@/components/other components/Pagination'
import FilterComponent from '@/components/other components/Filter'
import SearchModal from '@/components/other components/search/SearchContainer'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

function EventListingMain() {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [selelctedSort, setSelectedSort] = useState<string>('a-z')
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState<string>('')
    const navigate = useNavigate()
    const findEventsBasedOnQuery = useFindEventsOnQuery()
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
        setSelectedSort(key)
    }

    const handleFilterChange = (filters: Record<string, string>) => {
        setSelectedCategory(filters.category)
    }

    const handleOnSubmit = async (query: string) => {
        console.log(query)
        const response = await findEventsBasedOnQuery.mutateAsync(query)
        console.log(response)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const events = response.searchEvents.map((event: any) => ({
            _id: event._id,
            title: event.title,
            image: event.posterImage?.[0]
        }))
        return events
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleOnClick = (id: string, title: string) => {
        navigate(`/event/${id}`)
    }

    return (
        <div className='bg-black h-screen'>
            <div className='flex justify-end items-center gap-5 pt-3 pe-3 md:gap-4 md:pe-10'>

                <Button className='bg-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-[0_0_50px_rgba(147,51,234,0.8),0_0_5px_rgba(256,256,256,0.9)]
 hover:bg-purple-700 transition duration-200' onClick={() => setIsOpen(true)}>SEARCH</Button>
                <SearchModal handleOnClick={handleOnClick} onSubmit={handleOnSubmit} setIsOpen={setIsOpen} setText={setQuery} text={query} isOpen={isOpen} />
                <FilterComponent filterFields={filterFields} onFilterChange={handleFilterChange} onSortChange={handleSortSelect} sortOptions={sortOptions} onClearFilter={handleClearField} onClearSort={handleClearSort} />
            </div>
            <EventList events={filteredEvents || events} isLoading={findEvents.isLoading} currentPage={currentPage} />
            <Pagination current={currentPage} setPage={setCurrentPage} total={totalPages || filteredTotalPages} />
        </div>
    )
}

export default EventListingMain
