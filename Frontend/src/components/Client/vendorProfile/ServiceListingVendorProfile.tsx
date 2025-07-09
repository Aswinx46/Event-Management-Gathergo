"use client"

import { motion } from "framer-motion"
import { Clock, Award, AlertCircle, FileText } from "lucide-react"
import { useState } from "react"
import { FaRupeeSign } from "react-icons/fa"
import { useNavigate } from "react-router-dom"


export interface ServiceEntity {
    _id?: string
    title: string
    yearsOfExperience: number
    serviceDescription: string
    cancellationPolicy: string
    termsAndCondition: string
    serviceDuration: string
    servicePrice: number
    additionalHourFee: number
    status: string
    vendorId: string
    categoryId: string
}

interface ServicesListProps {
    services: ServiceEntity[]
}

export default function ServicesListingInVendorProfile({ services }: ServicesListProps) {
    const [expandedId, setExpandedId] = useState<string | null>(null)

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id)
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    }

    const navigate = useNavigate()

    return (
        <div className="bg-gradient-to-b from-black to-gray-900 min-h-[80vh] py-16 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto"
            >
                <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6 text-center">
                    Our Services
                </h2>
                <p className="text-gray-400 text-center max-w-3xl mx-auto mb-16 text-lg">
                    Browse through our professional services tailored to meet your needs. Each service is backed by years of
                    experience and expertise.
                </p>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {services.map((service) => (
                        <motion.div
                            key={service._id?.toString() || service.title}
                            variants={item}
                            whileHover={{
                                scale: 1.02,
                                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
                            }}
                            className="bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-gray-800/50 backdrop-blur-sm h-[520px] flex flex-col"
                        >
                            <div className="p-8 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-6">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent line-clamp-1">
                                        {service.title}
                                    </h3>
                                    <motion.div
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className={`px-4 py-1.5 rounded-full text-xs font-semibold ${service.status === "active"
                                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                            : service.status === "pending"
                                                ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                                                : "bg-red-500/10 text-red-400 border border-red-500/20"
                                            }`}
                                    >
                                        {service.status}
                                    </motion.div>
                                </div>

                                <p className="text-gray-400 mb-8 line-clamp-3 text-sm leading-relaxed h-[60px]">
                                    {service.serviceDescription}
                                </p>

                                <div className="grid grid-cols-2 gap-6 mb-8">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 rounded-lg bg-gray-800/50">
                                            <Clock className="h-5 w-5 text-purple-400" />
                                        </div>
                                        <span className="text-gray-300">{service.serviceDuration}</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 rounded-lg bg-gray-800/50">
                                            <FaRupeeSign className="h-5 w-5 text-purple-400" />
                                        </div>
                                        <span className="text-gray-300">₹{service.servicePrice}</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 rounded-lg bg-gray-800/50">
                                            <Award className="h-5 w-5 text-purple-400" />
                                        </div>
                                        <span className="text-gray-300">{service.yearsOfExperience} years</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 rounded-lg bg-gray-800/50">
                                            <FaRupeeSign className="h-5 w-5 text-purple-400" />
                                        </div>
                                        <span className="text-gray-300">+₹{service.additionalHourFee}/hr</span>
                                    </div>
                                </div>

                                <motion.button
                                    onClick={() =>navigate(`/serviceBooking/${service._id}/${service.vendorId}`)}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl transition-all duration-300 font-medium shadow-lg shadow-purple-500/20 mt-auto"
                                >
                                    Book Now
                                </motion.button>


                                <motion.button
                                    onClick={() => toggleExpand(service._id?.toString() || service.title)}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl transition-all duration-300 font-medium shadow-lg shadow-purple-500/20 mt-auto"
                                >
                                    {expandedId === (service._id?.toString() || service.title) ? "Show Less" : "View Details"}
                                </motion.button>

                                {expandedId === (service._id?.toString() || service.title) && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="mt-8 pt-6 border-t border-gray-800/50 overflow-y-auto max-h-[200px] custom-scrollbar"
                                    >
                                        <div className="mb-6">
                                            <div className="flex items-start space-x-4">
                                                <div className="p-2 rounded-lg bg-gray-800/50">
                                                    <AlertCircle className="h-5 w-5 text-purple-400" />
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-semibold mb-2">Cancellation Policy</h4>
                                                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{service.cancellationPolicy}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex items-start space-x-4">
                                                <div className="p-2 rounded-lg bg-gray-800/50">
                                                    <FileText className="h-5 w-5 text-purple-400" />
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-semibold mb-2">Terms & Conditions</h4>
                                                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{service.termsAndCondition}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    )
}
