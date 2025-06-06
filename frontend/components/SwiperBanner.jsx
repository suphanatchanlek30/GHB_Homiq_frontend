'use client';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import Next.js Image
import Image from 'next/image';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';

// รายการรูปภาพจาก public/Image_Swiper
const images = [
  '/Banner/bandder1.jpg',
  '/Banner/bandder2.jpg',
  '/Banner/bandder3.jpg',
];

const SwiperBanner = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={false}
      modules={[Autoplay, Pagination]}
      className="mySwiper"
    >
      {/* วนลูปรูปภาพทั้งหมด */}
      {images.map((src, idx) => (
        <SwiperSlide key={src+idx}>
          <div className="w-full h-[250px] flex items-center justify-center p-4">
            <Image
              src={src}
              alt={`Image ${idx + 1}`}
              width={400}
              height={180}
              className="w-full h-full object-cover rounded-xl"
              priority={idx === 0}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperBanner;
