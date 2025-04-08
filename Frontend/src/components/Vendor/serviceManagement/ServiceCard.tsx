
import { motion } from 'framer-motion';
import React from 'react';



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
    vendorId?: string;
    categoryId: string;
}


interface ServiceCardProps {
    service: Service;
    onEdit: (service: Service) => void;
}


const ServiceCard: React.FC<ServiceCardProps> = ({ service,onEdit }) => {

    const handleEdit=(service:Service)=>{
        console.log(service)
        onEdit(service)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-black to-gray-900 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all h-[600px] flex flex-col relative overflow-hidden group border border-white/10"
        >
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="border-b border-white/10 pb-4 relative z-10"
            >
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent leading-tight">
                    {service.serviceTitle}
                </h2>
                <div className="flex items-center justify-between mt-2">
                    <p className="text-gray-400">{service.yearsOfExperience} Years Experience</p>
                    <span className={`px-3 py-1 rounded-full text-sm ${service.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                        } text-white`}>
                        {service.status || 'Active'}
                    </span>
                </div>
            </motion.div>

            {/* Description Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="py-4 border-b border-white/10 overflow-y-auto custom-scrollbar flex-grow"
            >
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-300 ">{service.serviceDescription}</p>
            </motion.div>

            {/* Details Grid */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 gap-4 py-4 border-b border-white/10 bg-black/30 rounded-lg my-4 p-4"
            >
                <div>
                    <h3 className="text-sm font-semibold text-gray-400">Duration</h3>
                    <p className="text-white mt-1">{service.serviceDuration}</p>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-gray-400">Price</h3>
                    <p className="text-white mt-1">₹{service.servicePrice}</p>
                    <p className="text-xs text-gray-500">+₹{service.additionalHourFee}/extra hour</p>
                </div>
            </motion.div>

            {/* Policies Accordion */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="pt-4 space-y-4 overflow-y-auto custom-scrollbar max-h-[150px] bg-black/30 rounded-lg p-4"
            >
                <div className="group cursor-pointer">
                    <h3 className="text-sm font-semibold text-gray-400 mb-1">Cancellation Policy</h3>
                    <p className="text-gray-300 text-sm line-clamp-2 group-hover:line-clamp-none transition-all">
                        {service.cancellationPolicy}
                    </p>
                </div>
                <div className="group cursor-pointer">
                    <h3 className="text-sm font-semibold text-gray-400 mb-1">Terms & Conditions</h3>
                    <p className="text-gray-300 text-sm line-clamp-2 group-hover:line-clamp-none transition-all">
                        {service.termsAndCondition}
                    </p>
                </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex gap-3 mt-6 relative z-10 bg-gradient-to-t from-black via-black/95 to-transparent pt-4 -mx-6 px-6 pb-0"
            >
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEdit(service)}
                    className="flex-1 bg-white text-black py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                    Edit
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 border border-white text-white py-2 rounded-lg font-medium hover:bg-white/10 transition-colors"
                >
                    Delete
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default ServiceCard