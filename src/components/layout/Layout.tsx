'use client'

import React, { useEffect, useRef, useState } from "react";
import { Header } from "../header/Header";
import { Menu } from "../menu/Menu";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useRouter } from "next/navigation";
import "./styles/Layout.css";


interface SliderOption {
  id: number;
  title: string;
  description: string;
  image: any;
  category: string;
}

const sliderOptions: SliderOption[] = [
  {
    id: 1,
    title: "Private Yachts",
    description: "Navega por las hermosas aguas cristalinas del caribe mexicano",
    image: "/yacht_01.jpg",
    category: "Flota"
  },
  {
    id: 2,
    title: "CLUBS",
    description: "Los mejores Clubs Nocturnos de todo Cancún",
    image: "https://venues.com.mx/wp-content/uploads/2024/03/Confessions-Cancun-2-1920x1536.jpeg",
    category: "Destinos"
  },
  {
    id: 3,
    title: "TOURS",
    description: "Vive una nueva experiencia en Cancún y sus alrededores ",
    image: "/tours_01.jpg",
    category: "Gastronomía"
  },
  // {
  //   id: 4,
  //   title: "Aventuras Acuáticas",
  //   description: "Deportes y actividades en aguas cristalinas",
  //   image: "https://images.unsplash.com/photo-1544737151-6e4b01d6f167?w=800&h=600&fit=crop",
  //   category: "Actividades"
  // },
  // {
  //   id: 5,
  //   title: "Eventos Especiales",
  //   description: "Celebraciones únicas en el mar",
  //   image: "https://images.unsplash.com/photo-1519167758481-83f29c8d8d61?w=800&h=600&fit=crop",
  //   category: "Eventos"
  // }
];

export const Layout: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<any>(null);
  const router = useRouter();



  useEffect(() => {
    console.log('Active slide changed to:', activeSlide);
  }, [activeSlide]);

  useEffect(() => {
    // Force Swiper to recalculate after layout is ready
    const timer = setTimeout(() => {
      if (swiperRef.current) {
        swiperRef.current.update();
        swiperRef.current.updateSize();
        swiperRef.current.updateSlides();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleSlideChange = (index: number) => {
    console.log('Changing slide to index:', index, 'Current active:', activeSlide);
    if (index === activeSlide) return;

    // Immediately update the state
    setActiveSlide(index);



    // Navigate Swiper to match the selection
    if (swiperRef.current && swiperRef.current.activeIndex !== index) {
      swiperRef.current.slideTo(index);
    }
  };

  return (
    <section className="kana-layout">
      <div className="kana-layout-video-container">
        <video
          className="kana-layout-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="https://cdn.pixabay.com/video/2024/03/18/204565-924698132_large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="kana-layout-overlay"></div>
      </div>

      <Header />
      <div className="kana-layout-content">
        <div className="kana-layout-container">
          <div className="kana-layout-navigation-container">
            {/* Barra de navegación horizontal */}
            <div className="kana-layout-navigation-bar">
              <div className="kana-layout-navigation-separator"></div>
              <div className="kana-layout-navigation-item" onClick={() => router.push('/yachts')}>
                <span>Yates</span>
              </div>
              <div className="kana-layout-navigation-separator"></div>
              <div className="kana-layout-navigation-item" onClick={() => router.push('/tours')}>
                <span>Tours</span>
              </div>
              <div className="kana-layout-navigation-separator"></div>
              <div className="kana-layout-navigation-item" onClick={() => router.push('/clubs')}>
                <span>Clubs Nocturnos</span>
              </div>
              <div className="kana-layout-navigation-separator"></div>
              <div className="kana-layout-navigation-item" onClick={() => router.push('/about')}>
                <span>Sobre Nosotros</span>
              </div>
              <div className="kana-layout-navigation-separator"></div>
              <div className="kana-layout-navigation-item" onClick={() => router.push('/contact')}>
                <span>Contacto</span>
              </div>
            </div>
          </div>

          <div className="kana-layout-grid">
            {/* Right side - Slider options */}
            <div className="kana-layout-right">
              <div ref={sliderRef} className="kana-layout-slider">
                <h3 className="kana-layout-slider-title">Descubre Nuestras Experiencias</h3>

                <div className="kana-layout-carousel">
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    direction="horizontal"
                    width={null}
                    watchSlidesProgress={true}
                    navigation={{
                      nextEl: ".kana-layout-carousel-next",
                      prevEl: ".kana-layout-carousel-prev",
                    }}
                    pagination={{
                      clickable: true,
                      el: ".kana-layout-carousel-pagination",
                    }}
                    autoplay={{
                      delay: 4000,
                      disableOnInteraction: true,
                    }}
                    onSwiper={(swiper) => { swiperRef.current = swiper; setTimeout(() => swiper.update(), 100); }}
                    onSlideChange={(swiper) => handleSlideChange(swiper.activeIndex)}
                    className="kana-layout-swiper"
                  >
                    {sliderOptions.map((option, index) => (
                      <SwiperSlide key={option.id}>
                        <div
                          className={`kana-layout-option ${index === activeSlide ? 'active' : ''}`}
                          onClick={() => handleSlideChange(index)}
                        >
                          <div className="kana-layout-option-content">
                            <div className="kana-layout-option-icon">
                              <span className="material-icons-round">
                                {option.category === 'Flota' && 'directions_boat'}
                                {option.category === 'Destinos' && 'place'}
                                {option.category === 'Gastronomía' && 'restaurant'}
                                {option.category === 'Actividades' && 'sports_handball'}
                                {option.category === 'Eventos' && 'celebration'}
                              </span>
                            </div>
                            <div className="kana-layout-option-text">
                              <h4 className="kana-layout-option-title">{option.title}</h4>
                              <p className="kana-layout-option-description">{option.description}</p>
                            </div>
                            <div className="kana-layout-option-arrow">
                              <span className="material-icons-round">arrow_forward</span>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* Carousel Controls */}
                  <div className="kana-layout-carousel-controls">
                    <button className="kana-layout-carousel-prev">
                      <span className="material-icons-round">arrow_back</span>
                    </button>
                    <div className="kana-layout-carousel-pagination"></div>
                    <button className="kana-layout-carousel-next">
                      <span className="material-icons-round">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contenedor inferior rectangular */}
          <div className="kana-layout-bottom-container">
            <div className="kana-layout-bottom-content-container">
              <div className="kana-layout-bottom-content">
                <h4>Promociones Especiales</h4>
                <p>Descubre nuestras ofertas exclusivas para tu próxima aventura</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Menu /> */}
    </section>
  );
};
