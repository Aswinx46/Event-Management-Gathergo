"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, ExternalLink, MapPin, Star } from "lucide-react"
import { useFindVendorProfileWithSample } from "@/hooks/ClientCustomHooks"
import { useParams } from "react-router-dom"
import ServicesListingInVendorProfile from "./ServiceListingVendorProfile"
import Pagination from "@/components/other components/Pagination"

export interface VendorProfileEntityInClient {
    _id?: string
    title: string
    description: string
    images: string[]
    vendorId: {
        _id: string
        profileImage: string
        aboutVendor: string
    }
}


export default function VendorDetails() {
    const { vendorId } = useParams()
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const findVendorProfile = useFindVendorProfileWithSample(vendorId!, currentPage)
    const vendor = findVendorProfile.data?.vendorProfile
    const services = findVendorProfile.data?.services
    const totalPages = findVendorProfile.data?.totalPages
    console.log('this is the totalPages',totalPages)
    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev === vendor?.images.length - 1 ? 0 : prev + 1))
    }

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? vendor?.images.length - 1 : prev - 1))
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
            },
        },
    }

    return (
        <>
            <motion.div
                className="bg-black w-full pt-10 pb-10 text-white  overflow-hidden shadow-2xl  mx-auto"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {vendor ?
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Image Gallery Section */}
                        <div className="relative h-[400px] md:h-full">
                            <motion.div
                                key={currentImageIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="relative h-full w-full"
                            >
                                <img
                                    src={vendor.images[currentImageIndex] || "/placeholder.svg?height=600&width=600"}
                                    alt={`${vendor.title} image ${currentImageIndex + 1}`}
                                    className="object-cover "
                                />

                                {/* Image Navigation */}
                                <div className="absolute inset-0 flex items-center justify-between px-4">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={prevImage}
                                        className="bg-black/50 p-2 rounded-full text-white"
                                    >
                                        <ChevronLeft size={24} />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={nextImage}
                                        className="bg-black/50 p-2 rounded-full text-white"
                                    >
                                        <ChevronRight size={24} />
                                    </motion.button>
                                </div>

                                {/* Image Counter */}
                                <div className="absolute bottom-4 right-4 bg-black/70 px-3 py-1 rounded-full text-sm">
                                    {currentImageIndex + 1} / {vendor.images.length}
                                </div>
                            </motion.div>
                        </div>

                        {/* Vendor Details Section */}
                        <div className="p-6 md:p-8 flex flex-col justify-between">
                            <div className="space-y-6">
                                {/* Vendor Header */}
                                <div className="flex items-start justify-between">
                                    <motion.div variants={itemVariants} className="flex-1">
                                        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                                            {vendor.title}
                                        </h1>
                                        <div className="flex items-center mt-2 text-gray-400">
                                            <MapPin size={16} className="mr-1" />
                                            <span>Premium Vendor</span>
                                        </div>
                                    </motion.div>

                                    <motion.div variants={itemVariants} className="flex-shrink-0">
                                        <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-purple-500">
                                            <img
                                                src={vendor.vendorId.profileImage || "/placeholder.svg?height=100&width=100"}
                                                alt="Vendor profile"
                                                className="object-cover"
                                            />
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Rating */}
                                <motion.div variants={itemVariants} className="flex items-center">
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                size={18}
                                                className={star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}
                                            />
                                        ))}
                                    </div>
                                    <span className="ml-2 text-sm text-gray-400">4.0 (24 reviews)</span>
                                </motion.div>

                                {/* Description */}
                                <motion.div variants={itemVariants}>
                                    <h2 className="text-xl font-semibold mb-2 text-gray-200">About</h2>
                                    <p className="text-gray-400 leading-relaxed">{vendor.description}</p>
                                </motion.div>

                                {/* Vendor Bio */}
                                <motion.div variants={itemVariants}>
                                    <h2 className="text-xl font-semibold mb-2 text-gray-200">About the Vendor</h2>
                                    <p className="text-gray-400 leading-relaxed">{vendor.vendorId.aboutVendor}</p>
                                </motion.div>
                            </div>

                            {/* Action Buttons */}
                            <motion.div variants={itemVariants} className="mt-8 flex flex-col sm:flex-row gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium flex items-center justify-center"
                                >
                                    Contact Vendor
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="px-6 py-3 border border-purple-600 rounded-lg font-medium flex items-center justify-center"
                                >
                                    View Portfolio
                                    <ExternalLink size={16} className="ml-2" />
                                </motion.button>
                            </motion.div>
                        </div>
                    </div>
                    : <div className="h-[100vh] flex items-center justify-center bg-black text-white">
                        <div className="text-center p-6 rounded-xl bg-zinc-900 shadow-lg max-w-md">
                            <svg
                                className="mx-auto mb-4 w-12 h-12 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75h.008v.008H9.75V9.75zM14.25 9.75h.008v.008H14.25V9.75zM9 13.5h6m-9 7.5a9 9 0 1118 0 9 9 0 01-18 0z" />
                            </svg>
                            <h2 className="text-xl font-semibold text-white mb-2">No Work Samples Yet</h2>
                            <p className="text-gray-400">
                                The vendor hasn’t added any work samples. Please check back later!
                            </p>
                        </div>
                    </div>
                }

                {/* Image Thumbnails */}
                <motion.div variants={itemVariants} className="px-6 pb-6 overflow-x-auto">
                    <div className="flex gap-3 mt-4">
                        {vendor?.images.map((image: string, index: number) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`relative h-16 w-24 flex-shrink-0 cursor-pointer rounded-md overflow-hidden ${index === currentImageIndex ? "ring-2 ring-purple-500" : "opacity-70"
                                    }`}
                            >
                                <img
                                    src={image || "/placeholder.svg?height=100&width=100"}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="object-cover"
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
            {services && <ServicesListingInVendorProfile services={services} />}
            <div className="bg-[#0f1726] pb-5">
            <Pagination current={currentPage} setPage={setCurrentPage} total={totalPages} />
            </div>
        </>
    )
}
