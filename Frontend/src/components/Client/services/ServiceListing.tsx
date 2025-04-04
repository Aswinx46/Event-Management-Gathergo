import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';

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

interface ServicesListProps {
    services: Service[];
    title?: string;
}

const ServicesList: React.FC<ServicesListProps> = () => {

    const [currentPage, setCurrentPage] = useState<number>(1)



    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto bg-black">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-100 mb-2">{title}</h2>
                <div className="w-20 h-1 bg-white mx-auto mb-8"></div>
                <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
                    Browse through our selection of professional services tailored to meet your needs.
                </p>
            </motion.div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {services.map((service, index) => (
                    <ServiceCard
                        key={service._id || index}
                        serviceTitle={service.serviceTitle}
                        yearsOfExperience={service.yearsOfExperience}
                        serviceDescription={service.serviceDescription}
                        cancellationPolicy={service.cancellationPolicy}
                        termsAndCondition={service.termsAndCondition}
                        serviceDuration={service.serviceDuration}
                        servicePrice={service.servicePrice}
                        additionalHourFee={service.additionalHourFee}
                    />
                ))}
            </motion.div>
        </section>
    );
};

export default ServicesList;
