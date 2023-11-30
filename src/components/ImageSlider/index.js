// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Zoom, Navigation, Pagination } from "swiper/modules";

const ImageSlider = ({ data, onSlideChange }) => {
  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#a78bfa",
          "--swiper-pagination-color": "#fff",
        }}
        zoom={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Zoom, Navigation, Pagination]}
        className="mySwiper"
        onSlideChange={(e) => onSlideChange && onSlideChange(e.activeIndex)}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-zoom-container">
              <img src={item} style={{ maxHeight: 500 }} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ImageSlider;
