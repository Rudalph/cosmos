import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

import {
  FaGlobeAmericas,
  FaRocket,
  FaCameraRetro,
  FaMeteor,
  FaImages,
} from "react-icons/fa";

const apiData = [
  {
    icon: <FaCameraRetro size={30} />,
    title: "Astronomy Picture of the Day (APOD)",
    description:
      "Daily stunning images of space with brief explanations by professional astronomers.",
  },
  {
    icon: <FaRocket size={30} />,
    title: "Mars Rover Photos",
    description:
      "Explore raw and processed images taken by NASA's Mars Rovers — Curiosity, Opportunity & Spirit.",
  },
  {
    icon: <FaGlobeAmericas size={30} />,
    title: "Earth Polychromatic Imaging Camera (EPIC)",
    description:
      "High-resolution Earth images taken from DSCOVR satellite, updated multiple times a day.",
  },
  {
    icon: <FaMeteor size={30} />,
    title: "Near Earth Object Web Service (NeoWs)",
    description:
      "Track asteroids and comets that approach Earth, with real-time trajectory data.",
  },
  {
    icon: <FaImages size={30} />,
    title: "NASA Image & Video Library",
    description:
      "A searchable library of 140,000+ images, videos, and audio files from NASA’s missions.",
  },
];

const ApiCarousel = () => {
  return (
    <div className="px-6 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
        API's
      </h2>

      <Swiper
        modules={[Autoplay, FreeMode]}
        spaceBetween={20}
        freeMode={true}
        loop={true}
        grabCursor={true}
        speed={8000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: { slidesPerView: 1.2 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {apiData.map((api, index) => (
          <SwiperSlide key={index}>
            <div className="w-full border-2 border-black h-56 rounded-2xl shadow-xl p-6 text-center flex flex-col justify-start items-center transition-transform duration-300 hover:scale-105">
              <div className="text-blue-600 mb-4">{api.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {api.title}
              </h3>
              <p className="text-gray-600 text-sm overflow-hidden text-ellipsis">
                {api.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ApiCarousel;
