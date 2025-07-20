"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useEffect } from "react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";

const HeroSlider = ({ heroSliders }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                modules={[Autoplay, Pagination]}
            >
                {heroSliders.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="h-[180px] md:h-[320px] lg:h-[360px] rounded relative overflow-hidden">
                            {/* Mobile Image */}
                            <Image
                                src={item.small_image || item.full_image}
                                alt={`Slide ${index + 1}`}
                                fill
                                unoptimized
                                className="w-full h-full object-cover object-center rounded md:hidden"
                            />
                            {/* Desktop Image */}
                            <Image
                                src={item.full_image || item.small_image}
                                alt={`Slide ${index + 1}`}
                                fill
                                unoptimized
                                className="w-full h-full object-cover object-center rounded hidden md:block"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeroSlider;
