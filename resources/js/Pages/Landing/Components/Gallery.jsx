import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { useEffect, useMemo } from "react";

const Gallery = ({galleries}) => {
    

  useEffect(() => {
    galleries.forEach((gallery) => {
      const img = new Image();
      img.src = gallery.image;
    });
  }, []);

  return (
    <section id="gallery" className="lg:p-5 mt-10">
      <Swiper
        modules={[EffectCoverflow, Autoplay]}
        centeredSlides={true}
        loop={true}
        effect="coverflow"
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          // Mobile and Tablet
          0: {
            slidesPerView: 1.3,
            spaceBetween: 1,
          },
          // Desktop
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        className="w-full h-[70vh]"
      >
        {galleries.map((gallery) => (
          <SwiperSlide key={gallery.id}>
            <img
              src={`/storage/${gallery.image}`}
              alt={`Gallery ${gallery.id}`}
              className="w-full h-full object-cover rounded-lg"
              loading="eager"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Gallery;
