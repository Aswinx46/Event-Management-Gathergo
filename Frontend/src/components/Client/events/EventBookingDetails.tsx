"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, Mail, Twitter, Facebook, Instagram } from "lucide-react"
import { EventType } from "@/types/EventType"
import { useParams } from "react-router-dom"
import { useFindEventById } from "@/hooks/ClientCustomHooks"
import MapComponent from "./ShowLocation"
import TicketPurchase from "./TicketBookingModal"

export default function EventDetails() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [showTicketPurchase,setShowTicketPurchase]=useState<boolean>(false)
    const { eventId } = useParams<{ eventId: string }>()
    useEffect(() => {
        setIsLoaded(true)
    }, [])
    const findEventById = useFindEventById(eventId!)
    const event: EventType = findEventById.data?.event
    if (!event) return (<p>Loading .....</p>)
    console.log(findEventById.data)



    // Format date for display


    // Format time for display
    const formatTime = (time?: Date) => {
        if (!time) return null;
        const date = new Date(time);
        if (isNaN(date.getTime())) return null;
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };


    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6 } },
    }

    const slideUp = {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    }

    const stagger = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }
    console.log('startTime:', event?.startTime);
    console.log('endTime:', event?.endTime);

    return (
        <div className="bg-black">
            {showTicketPurchase && <TicketPurchase event={event} setOpen={setShowTicketPurchase} open={showTicketPurchase}/>}
            <motion.div
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                variants={fadeIn}
                className="bg-black text-white min-h-screen p-6 md:p-8 max-w-7xl mx-auto"
            >
                <motion.h1 variants={slideUp} className="text-2xl font-bold mb-6">
                    Event Details
                </motion.h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Event Image */}
                    <motion.div variants={fadeIn} className="lg:col-span-2 h-[50vh]">
                        <img
                            src={
                                typeof event?.posterImage?.[0] === "string"
                                    ? event?.posterImage[0]
                                    : "/placeholder.svg?height=400&width=600"
                            }
                            alt={event?.title}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </motion.div>

                    {/* Event Info */}
                    <motion.div variants={stagger} className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                        <motion.h2 variants={slideUp} className="text-2xl font-bold mb-3">
                            {event?.title}
                        </motion.h2>
                        <motion.p variants={slideUp} className="text-neutral-400 text-sm mb-6 md:line-clamp-4 md:overflow-y-scroll hide-scrollbar">
                            {event?.description}
                        </motion.p>

                        <motion.div variants={slideUp} className="space-y-4 mb-6">
                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-purple-400" />
                                <div>
                                    {event?.date?.map((date, i) => (
                                        <span key={i} className=" text-sm text-neutral-300">
                                            {new Date(date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    ))}
                                    {/* <p className="text-sm text-neutral-300">February 2, 2025</p> */}
                                    <p className="text-xs text-neutral-500">
                                        {formatTime(event?.startTime)} - {formatTime(event?.endTime)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-purple-400 mt-1" />
                                <div>
                                    <p className="text-sm text-neutral-300">{event?.venueName || 'GCE KANNUR'}</p>
                                    <p className="text-xs text-neutral-500">{event?.address || 'Government College of Engineering Kannur, Dharmasala, Kerala 670563, India'}</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={slideUp} className="mb-6">
                            <p className="text-xs font-medium text-neutral-500 mb-2">SHARE</p>
                            <div className="flex gap-2">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2 bg-neutral-800 rounded hover:bg-neutral-700 transition-colors"
                                >
                                    <Mail className="w-4 h-4" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2 bg-neutral-800 rounded hover:bg-neutral-700 transition-colors"
                                >
                                    <Twitter className="w-4 h-4" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2 bg-neutral-800 rounded hover:bg-neutral-700 transition-colors"
                                >
                                    <Facebook className="w-4 h-4" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2 bg-neutral-800 rounded hover:bg-neutral-700 transition-colors"
                                >
                                    <Instagram className="w-4 h-4" />
                                </motion.button>
                            </div>
                        </motion.div>

                        <motion.button
                            variants={slideUp}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={()=>setShowTicketPurchase(true)}
                            className="w-full bg-black text-white py-3 rounded font-medium hover:bg-neutral-800 transition-colors"
                        >
                            Book Now
                        </motion.button>
                    </motion.div>
                </div>

                {/* About The Event and Map Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    <motion.div variants={slideUp} className="lg:col-span-1 ">
                        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 h-full">
                            <h3 className="text-lg font-bold mb-4 ">About The Event</h3>
                            <motion.div variants={stagger} className="space-y-3 text-sm">
                                <motion.div variants={slideUp} className="flex justify-between items-center">
                                    <span className="text-neutral-400 pb-3">Jeepers Of Bangalore</span>
                                </motion.div>
                                <motion.div variants={slideUp} className="flex justify-between items-center">
                                    <span className="text-neutral-400 pb-3">Reg fee</span>
                                    <span className="text-neutral-300 pb-3">₹ {event?.pricePerTicket || '150'}</span>
                                </motion.div>
                                <motion.div variants={slideUp} className="flex justify-between items-center">
                                    <span className="text-neutral-400 pb-3">Date</span>
                                    {event?.date?.map((date, i) => (
                                        <span key={i} className="text-neutral-300">
                                            {new Date(date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    ))}
                                </motion.div>
                                <motion.div variants={slideUp} className="flex justify-between items-center">
                                    <span className="text-neutral-400 pb-3">Venue</span>
                                    <span className="text-neutral-300 pb-3">{event?.venueName}</span>
                                </motion.div>
                                <motion.div variants={slideUp} className="flex justify-between items-center">
                                    <span className="text-neutral-400 pb-3">Contact</span>
                                    <span className="text-neutral-300 pb-3">Unknown - +91 99957 10101</span>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Map */}
                    <motion.div variants={fadeIn} className="lg:col-span-2 z-10">
  
                        <MapComponent lat={event?.location?.latitude} lng={event?.location?.longitude} />
                    </motion.div>
                </div>

                {/* Organizer Info */}
                <motion.div variants={slideUp} className="mt-6 bg-neutral-900 border border-neutral-800 p-6 rounded-lg">
                    <h4 className="text-sm text-neutral-300 mb-2">Organised by Xplore 24 ( xplore24.gce@gmail.com )</h4>
                    <p className="text-xs text-neutral-500">XPLORE 24 STANDS AS A BEACON OF INNOVATION, CREATIVITY, AND EXCELLENCE, UNITING THE REALMS OF TECHNOLOGY, MANAGEMENT, AND CULTURE UNDER ONE DYNAMIC PLATFORM. ROOTED IN THE VIBRANT LEGACY OF ITS PREDECESSORS, XPLORE CONTINUES TO PUSH BOUNDARIES, INSPIRE STUDENTS, PROFESSIONALS, AND ENTHUSIASTS TO COLLABORATE.</p>
                    <p className="text-xs text-neutral-400 mt-2">Explore more events by Xplore 24</p>
                </motion.div>
            </motion.div>
        </div>
    )
}
