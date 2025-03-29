import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

function ImageCarousel() {
    return (
        <div className=" flex h-1/4 lg:w-1/2 md:flex-row w-full md:h-screen overflow-hidden">
            <Swiper
                pagination={{ clickable: true }}
                modules={[Pagination, Autoplay]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                className="h-full"
            >
                {["/band live.jpg", "/wedding.png", "/kiss.jpg"].map((image, index) => (
                    <SwiperSlide key={index}>
                        <motion.img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-full object-cover"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default ImageCarousel;
