import { useChangeStatusServiceVendor, useCreateServiceMutation, useEditServiceVendor, useFetchCategoryForServiceQuery, useFetchServiceVendor } from '@/hooks/VendorCustomHooks';
import { RootState } from '@/store/store';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AddServiceModal from './AddServiceModal';
import ServiceCard from './ServiceCard';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import Pagination from '@/components/other components/Pagination';
interface Service {
    _id?: string;
    title: string;
    yearsOfExperience: number;
    serviceDescription: string;
    cancellationPolicy: string;
    termsAndCondition: string;
    serviceDuration: string;
    servicePrice: number;
    additionalHourFee: number;
    status: string;
    vendorId?: string;
    categoryId: string;
}



interface Category {
    _id: string;
    title: string;
}


const ServiceListingVendor: React.FC = () => {

    const [currentPage,setCurrentPage] = useState<number>(1)
    const vendorId = useSelector((state: RootState) => state.vendorSlice.vendor?._id)
    const [selectedService, setSelectedService] = useState<Service | null>()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const { data, isLoading, isError } = useFetchServiceVendor({
        vendorId: vendorId as string,
        pageNo: currentPage,
    })

    const fetchCategory = useFetchCategoryForServiceQuery()
    const createService = useCreateServiceMutation()
    const editService = useEditServiceVendor()
    const changeStatusService = useChangeStatusServiceVendor()
    const services: Service[] = data?.Services
    const totalPages=data?.totalPages
    const categories: Category[] = fetchCategory?.data?.categories
    
    const queryClient = useQueryClient()

    const handleSubmit = (values: Service) => {
        delete values._id
        values.status = 'active'
        values.vendorId = vendorId
        createService.mutate(values, {
            onSuccess: (data) => {
                toast.success(data.message)
                queryClient.invalidateQueries({ queryKey: ['services-in-vendor', vendorId, currentPage] })
                setIsOpen(false)
            },
            onError: (err) => {
                toast.error(err.message)
                console.log(err)
            }
        })
    }

    const handleEditData = (service: Service) => {
        console.log(service)
        editService.mutate({ service, serviceId: service._id! }, {
            onSuccess: (data) => {
                toast.success(data.message)
                queryClient.invalidateQueries({ queryKey: ['services-in-vendor', vendorId, currentPage] })
                setIsOpen(false)
            },
            onError: (err) => {
                toast.error(err.message)
            }
        })
    }

    const handleSelectedData = (service: Service) => {
        console.log(service)
        setSelectedService(service)
        setIsOpen(true)
    }

    const handleChangeStatusofService = (serviceId: string) => {
        changeStatusService.mutate(serviceId, {
            onSuccess: (data) => {
                toast.success(data.message)
                queryClient.invalidateQueries({ queryKey: ['services-in-vendor', vendorId, currentPage] })
            },
            onError: (err) => {
                toast.error(err.message)
            }
        })
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
        )
    }

    if (isError || !data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Services</h2>
                    <p className="text-gray-600">Please try again later</p>
                </div>
            </div>
        )
    }

    // if (!data.Services || data.Services.length === 0) {
    //     return (
    //         <div className="min-h-screen flex items-center justify-center">
    //             <div className="text-center">
    //                 <h2 className="text-2xl font-bold text-gray-800 mb-2">No Services Found</h2>
    //                 <p className="text-gray-600 mb-4">Start by adding your first service</p>
    //                 <motion.button
    //                     whileHover={{ scale: 1.05 }}
    //                     whileTap={{ scale: 0.95 }}
    //                     onClick={()=>setIsOpen(true)}
    //                     className="px-6 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
    //                 >
    //                     Add New Service
    //                 </motion.button>
    //             </div>
    //         </div>
    //     )
    // }



    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white  p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <AddServiceModal categories={categories} isOpen={isOpen} setIsOpen={setIsOpen} onSubmit={handleSubmit} data={selectedService || undefined} onEdit={handleEditData} />
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto mb-8"
            >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h1 className="text-3xl font-bold text-black">Your Services</h1>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>{ setIsOpen(true); setSelectedService(null)}}
                        className="px-6 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
                    >
                        Add New Service
                    </motion.button>
                </div>
            </motion.div>

            {/* Services Grid */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-10 gap-8"
            >
                {services?.map((service) => (
                    <ServiceCard key={service._id} service={service} onEdit={handleSelectedData} changeStatusService={handleChangeStatusofService} />
                ))}
            </motion.div>
            <Pagination current={currentPage} setPage={setCurrentPage} total={totalPages}/>
        </div>
    );
};

export default ServiceListingVendor;