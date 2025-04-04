import React from 'react';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

export interface Category {
  id: string | number;
  title: string;
  image: string;
}

interface FuturisticCarouselProps {
  categories: Category[];
}

const FuturisticCarousel = ({ categories }: FuturisticCarouselProps) => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {categories.map((category) => (
          <CarouselItem
            key={category.id}
            className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/5"
          >
            <motion.div
              className="relative group overflow-hidden rounded-xl aspect-[4/5] bg-black"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {/* Image with overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 z-10" />

              <img
                src={category.image}
                alt={category.title}
                className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-110"
              />

              {/* Border glow effect on hover */}
              <motion.div
                className="absolute inset-0 border-2 border-transparent rounded-xl z-20 opacity-0 group-hover:opacity-100 transition-all duration-300"
                initial={{ borderColor: "rgba(6,182,212,0)" }}
                whileHover={{
                  borderColor: "rgba(6,182,212,0.7)",
                  boxShadow: "0 0 15px 2px rgba(6,182,212,0.3)"
                }}
              />

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <motion.h3
                  className="text-white text-xl font-medium tracking-wide"
                  initial={{ y: 5, opacity: 0.8 }}
                  whileHover={{ y: 0, opacity: 1 }}
                >
                  {category.title}
                </motion.h3>
              </div>
            </motion.div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="flex items-center justify-end gap-2 mt-4">
        <CarouselPrevious className="relative inset-0 translate-y-0 bg-black/50 backdrop-blur-sm text-white hover:bg-cyan-500/50 border-white/10 transition-colors" />
        <CarouselNext className="relative inset-0 translate-y-0 bg-black/50 backdrop-blur-sm text-white hover:bg-cyan-500/50 border-white/10 transition-colors" />
      </div>
    </Carousel>
  );
};

export default FuturisticCarousel;
