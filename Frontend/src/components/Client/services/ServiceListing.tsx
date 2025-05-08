import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';
import { useFindAllCategoryForListing, useFindServiceForclient, useFindServiceOnCategoryBasis, useFindServiceUsingSearch } from '@/hooks/ClientCustomHooks';
import Pagination from '@/components/other components/Pagination';
import { useNavigate, useParams } from 'react-router-dom';
import FilterComponent from '@/components/other components/Filter';
import SearchModal from '@/components/other components/search/SearchContainer';
import { Button } from '@/components/ui/button';
// import { toast } from 'react-toastify';

// interface SearchResult {
//     _id: string
//     title: string
//     image: string
//     category?: string
// }

interface FilterItem {
    _id?: string
    title: string
    profileImage?: string
}
interface Service {
    _id?: string;
    serviceTitle: string;
    yearsOfExperience: number;
    serviceDescription: string;
    cancellationPolicy: string;
    termsAndCondition: string;
    serviceDuration: string;
    servicePrice: number;
    additionalHourFee: number;
    status: string;
    vendorId: string;
    categoryId: string;
}

const ServicesList: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchOpen, setSearchOpen] = useState<boolean>(false)
    const [totalPages, setTotalPages] = useState<number>(1);
    const [selectedSort, setSelectedSort] = useState<string>('a-z')
    const [query, setQuery] = useState<string>('')
    // const [searchedService, setSearchedService] = useState<SearchResult[] | []>([])
    const { data: fetchedData, error: errorAll } = useFindServiceForclient(currentPage);
    const findCategory = useFindAllCategoryForListing(1)
    const { categoryId, title } = useParams()
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(categoryId ?? null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [selecteCategoryTitle, setSelectedCategoryTitle] = useState<string | null>(title ?? null)
    const { data: servicesWithCategory, error: errorCategory } = useFindServiceOnCategoryBasis(selectedCategoryId ?? '', currentPage, selectedSort, { enabled: !!selectedCategoryId || selectedSort !== '' })
    const searchService = useFindServiceUsingSearch()
    const categories = findCategory.data?.categories
    // console.log('this is categories', categories)

    const filterFields = categories ? [
        {
            key: "category",
            label: "Category",
            options: categories.map((cat: FilterItem) => ({
                value: cat._id || '',
                label: cat.title
            }))
        }
    ] : [];

    useEffect(() => {
        if (fetchedData?.totalPages) {
            setTotalPages(fetchedData.totalPages);
        }
    }, [fetchedData]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const navigate = useNavigate()

    if (errorAll || errorCategory) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500">Error loading services. Please try again later.</p>
            </div>
        );
    }


    const categorySortOptions = [
        { key: 'a-z', label: 'Title: A to Z' },
        { key: 'z-a', label: 'Title: Z to A' },
        { key: 'newest', label: 'Newest First' },       // based on createdAt
        { key: 'oldest', label: 'Oldest First' },       // based on createdAt
        { key: 'recently-updated', label: 'Recently Updated' }, // based on updatedAt
    ];
    // const services: Service[] = selectedCategoryId ? servicesWithCategory?.Services || [] : fetchedData?.Services || [];
    const services: Service[] = servicesWithCategory?.Services || fetchedData?.Services || [];
    console.log(services)
    const handleServiceBooking = (serviceId: string, vendorId: string) => {
        navigate(`/serviceBooking/${serviceId}/${vendorId}`)
    }

    const handleSelectSort = (sort: string) => {
        setSelectedSort(sort)
        console.log(sort)
    }

    const handleSelectItem = (filters: Record<string, string>) => {
        setSelectedCategoryId(filters.category)
        // setSelectedCategoryTitle(filters.category)
        // console.log(filters)
        // console.log(filters)
    }

    const handleClearField = () => {
        setSelectedCategoryId(null)
    }
    const handleClearSort = () => {
        setSelectedSort('a-z')
    }
    const handleSearchOnClick = (id: string, title: string) => {
        console.log(id)
        console.log(title)
    }
    const handleOnSubmit = async () => {
        console.log(query)

        const service = await searchService.mutateAsync(query)
        console.log(service)
        return service.searchedService
    }
    return (
        <div className='w-full min-h-screen bg-black'>
            <div className='flex justify-end pt-5 items-center px-0 md:px-[10%] gap-1 md:gap-4'>
                <Button onClick={() => setSearchOpen(true)}>SEARCH</Button>
                {<SearchModal handleOnClick={handleSearchOnClick} onSubmit={handleOnSubmit} setIsOpen={setSearchOpen} setText={setQuery} text={query} isOpen={searchOpen} />}
                {!categoryId && <FilterComponent filterFields={filterFields} onSortChange={handleSelectSort} onClearFilter={handleClearField} onClearSort={handleClearSort} onFilterChange={handleSelectItem} sortOptions={categorySortOptions} />}
            </div>
            <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-100 mb-2">{categoryId ? `SERVICES ON ${selecteCategoryTitle} CATEGORY` : 'SERVICES'}</h2>
                    <div className="w-20 h-1 bg-white mx-auto mb-8"></div>
                    <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
                        Browse through our selection of professional services tailored to meet your needs.
                    </p>
                </motion.div>

                {services.length === 0 ? (
                    <div className="text-center text-gray-400 py-12">
                        No services available at the moment.
                    </div>
                ) : (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {services?.map((service: Service, index: number) => (
                            <div key={service._id || index} className="h-full">
                                <ServiceCard
                                    serviceId={service._id!}
                                    vendorId={service.vendorId!}
                                    serviceTitle={service.serviceTitle}
                                    yearsOfExperience={service.yearsOfExperience}
                                    serviceDescription={service.serviceDescription}
                                    cancellationPolicy={service.cancellationPolicy}
                                    termsAndCondition={service.termsAndCondition}
                                    serviceDuration={service.serviceDuration}
                                    servicePrice={service.servicePrice}
                                    additionalHourFee={service.additionalHourFee}
                                    handleServiceBooking={handleServiceBooking}
                                />
                            </div>
                        ))}
                    </motion.div>
                )}
            </section>
            {services.length > 0 && (
                <div className="py-8">
                    <Pagination current={currentPage} setPage={setCurrentPage} total={totalPages} />
                </div>
            )}
        </div>
    );
};

export default ServicesList;
