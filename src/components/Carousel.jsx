import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Sample carousel images
const carouselImages = [
  '/images/carousel/1.jpg',
  '/images/carousel/2.jpg',
  '/images/carousel/3.jpg',
  '/images/carousel/4.jpg',
  '/images/carousel/5.jpg',
];

const Carousel = () => {
  return (
    <div className="container-fluid px-lg-4 mt-4">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {carouselImages.map((image, index) => (
          <SwiperSlide key={index}>
            <img 
              src={image} 
              alt={`Carousel ${index + 1}`} 
              className="w-full h-[60vh] object-cover"
              // Fallback image in case the path doesn't work in the React environment
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel; 