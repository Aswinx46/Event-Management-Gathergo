'use client';

import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const slides = [
    {
        id: 1,
        image: '/kiss.jpg',
        title: 'Create Memorable Events',
        description: 'Plan and organize events that leave lasting impressions',
    },
    {
        id: 2,
        image: '/banner3.webp',
        title: 'Professional Planning',
        description: 'Expert guidance for your special occasions',
    },
    {
        id: 3,
        image: '/concertlive.jpg',
        title: 'Seamless Experience',
        description: 'From concept to execution, we handle it all',
    },
];

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const navigate = useNavigate()

    return (
        <div className="relative h-[600px] w-full overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    className="absolute inset-0"
                >
                    <div
                        className="h-full w-full bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
                    >
                        <div className="absolute inset-0 bg-black/50" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="mb-4 text-2xl md:text-5xl font-bold"
                            >
                                {slides[currentSlide].title}
                            </motion.h1>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className=" text-lg text-center md:text-xl"
                            >
                                {slides[currentSlide].description}
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 w-8 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white' : 'bg-white/50'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
            <Button onClick={() => navigate('/events')} className=' top-[54vh] left-[32vw]  absolute md:top-[40vh] bg-transparent hover:bg-gray-500 md:right-[31vw]'>BOOK EVENTS</Button>
        </div>
    );
};

export default HeroSection;