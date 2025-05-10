import EventList from '@/components/other components/events/EventList';
import KmRangeSelect from '@/components/other components/KmrangeComponent';
import Pagination from '@/components/other components/Pagination';
import { useFindEventsNearToUser } from '@/hooks/ClientCustomHooks'
import useUserLocation from '@/hooks/LocationCustomHook'
import { useEffect, useState } from 'react'

function ShowEventsNearYou() {
    const { location, error } = useUserLocation()
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [range, setRange] = useState<number>(5000)
    const { mutate: fetchNearbyEvents, data: response, isPending, isError } = useFindEventsNearToUser();

    useEffect(() => {
        if (location) {
            console.log(location)
            fetchNearbyEvents({ latitude: location.latitude, longitude: location.longitude, pageNo: currentPage, range })
        }
    }, [location, fetchNearbyEvents, currentPage, range])
    console.log(response?.events)
    if (error) return <p>{error}</p>;
    if (isPending) return <p>Loading events...</p>;
    if (isError) return <p>Failed to load events.</p>;
    // console.log("event response", response)
    const handleUpdateRange = (newRange: number) => {
        console.log(newRange * 1000)
        setRange(newRange * 1000)
    }

    return (
        <div className='bg-black h-[100vh]'>
            <div className='flex justify-end pe-3  md:pe-6'>
                <KmRangeSelect value={range / 1000} onSelect={handleUpdateRange} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-center text-white mt-8 mb-6 tracking-wide drop-shadow-[0_0_15px_rgba(147,51,234,0.6)]">
                Events Near To You
            </h1>

            {response?.events && <EventList currentPage={currentPage} events={response?.events} isLoading={isPending} />}
            <Pagination current={currentPage} setPage={setCurrentPage} total={response?.totalPages || 1} />
        </div>
    )
}

export default ShowEventsNearYou

