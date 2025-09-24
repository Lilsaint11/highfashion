import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CarouselSlider = () => {
  useEffect(() => {
    // Ensure Swiper modules are registered
    import('swiper').then(({ Swiper }) => {
      Swiper.use([Autoplay, Navigation, Pagination]);
    });
  }, []);

  return (
    <div className="relative w-full h-screen">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        speed={500}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
        className="w-full h-full"
      >
        {[
          { src: '/images/slider1.webp', alt: 'Slide 1', title: 'Summer Collection', desc: 'Discover the latest trends', link: '/shop' },
          { src: '/images/slider2.webp', alt: 'Slide 2', title: 'Bold Fashion', desc: 'Make a statement', link: '/shop' },
          { src: '/images/slider3.webp', alt: 'Slide 3', title: 'New Arrivals', desc: 'Shop fresh styles', link: '/shop' },
          { src: '/images/slider4.webp', alt: 'Slide 4', title: 'Exclusive Offers', desc: 'Limited time only', link: '/shop' },
        ].map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center text-center text-white">
              <div className="font-noto-sans-jp">
                <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-shadow">{slide.title}</h1>
                <p className="text-lg sm:text-xl mb-6">{slide.desc}</p>
                <a
                  href={slide.link}
                  className="inline-block bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Shop Now
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
     
      <div className="swiper-pagination !bottom-10"></div>
      <style>{`
        .swiper-pagination-bullet {
          background: white;
          opacity: 0.5;
          width: 10px;
          height: 10px;
          margin: 0 5px;
          position: relative;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
        }
        .swiper-pagination-bullet-active::after {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            width: 14px;
            height: 14px;
            background: transparent;
            border: 2px solid white;
            border-radius: 50%;
            clip-path: circle(0% at 50% 50%);
            animation: grow-circle 3s linear forwards;
            z-index: 1;
          }
          @keyframes grow-circle {
            0% { clip-path: circle(0% at 50% 50%); }
            100% { clip-path: circle(50% at 50% 50%); }
          }
          .header-container {
            position: relative;
            overflow: hidden;
          }
          .header-container::before {
            content: '';
            position: absolute;
            top: -100%;
            left: 0;
            width: 100%;
            height: 100%;
            background: black;
            transition: top 0.2s ease-in-out;
            z-index: -1;
          }
          .header-container:hover::before {
            top: 0;
          }
      `}</style>
    </div>
  );
};

export default CarouselSlider;