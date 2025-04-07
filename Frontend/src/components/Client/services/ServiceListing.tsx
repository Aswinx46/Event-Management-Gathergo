import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';
import { useFindServiceForclient } from '@/hooks/ClientCustomHooks';
import Pagination from '@/components/other components/Pagination';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
    const [totalPages, setTotalPages] = useState<number>(1);
    const { data: fetchedData, isLoading, error } = useFindServiceForclient(currentPage);

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

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500">Error loading services. Please try again later.</p>
            </div>
        );
    }

    const services: Service[] = fetchedData?.Services || [];
    console.log(services)
    const handleServiceBooking = (serviceId: string, vendorId: string) => {
        console.log('this is service id',serviceId)
        console.log('this is vendorid',vendorId)
        navigate(`/serviceBooking/${serviceId}/${vendorId}`)
    }

    return (
        <div className='w-full min-h-screen bg-black'>
            <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-100 mb-2">SERVICES</h2>
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
                        {services.map((service: Service, index: number) => (
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
