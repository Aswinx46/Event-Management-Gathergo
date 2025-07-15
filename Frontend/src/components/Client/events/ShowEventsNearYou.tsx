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
 

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-black text-red-500">
                <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v2m0 4h.01M21 12A9 9 0 103 12a9 9 0 0018 0z"
                    />
                </svg>
                <p className="text-lg font-medium">{error}</p>
            </div>
        );
    }

    if (isPending) {
        return (
            <div className="flex items-center justify-center h-screen bg-black text-white">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white mr-3"></div>
                <p className="text-lg font-medium">Loading events...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center h-screen bg-black text-red-500">
                <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v2m0 4h.01M21 12A9 9 0 103 12a9 9 0 0018 0z"
                    />
                </svg>
                <p className="text-lg font-medium">Failed to load events.</p>
            </div>
        );
    }

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

