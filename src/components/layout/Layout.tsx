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
  title: string;
  description: string;
  category: string;
  image: string;
  icon: string;
}

const sliderOptions: SliderOption[] = [
  {
    title: 'Flota de Yates',
    description: 'Descubre nuestra exclusiva flota de yates de lujo, diseñados para ofrecerte la máxima comodidad y elegancia en el mar.',
    category: 'Flota',
    image: '/yacht_main.jpg',
    icon: 'directions_boat'
  },
  {
    title: 'Destinos Únicos',
    description: 'Explora los destinos más hermosos y exclusivos del Caribe, desde playas vírgenes hasta islas paradisíacas.',
    category: 'Destinos',
    image: '/tours_01.jpg',
    icon: 'place'
  },
  {
    title: 'Experiencias Gastronómicas',
    description: 'Disfruta de la mejor gastronomía local e internacional, preparada por chefs expertos a bordo de nuestros yates.',
    category: 'Gastronomía',
    image: '/party.jpg',
    icon: 'restaurant'
  },
  {
    title: 'Actividades Acuáticas',
    description: 'Sumérgete en emocionantes actividades acuáticas como buceo, snorkel, pesca deportiva y más.',
    category: 'Actividades',
    image: '/yacht_01.jpg',
    icon: 'sports_handball'
  },
  {
    title: 'Eventos Especiales',
    description: 'Celebra momentos inolvidables como bodas, cumpleaños, aniversarios y eventos corporativos en el mar.',
    category: 'Eventos',
    image: '/yacht-main.jpg',
    icon: 'celebration'
  }
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

    // Add resize listener for responsive behavior
    const handleResize = () => {
      if (swiperRef.current) {
        swiperRef.current.update();
        swiperRef.current.updateSize();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
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
          <div>
            <div className="kana-layout-full-rectangle">
              <div className="full-rectangle-content">
                <h3 className="full-rectangle-title">Bienvenido a Kana Experience</h3>
                <p className="full-rectangle-description">
                  Descubre las mejores experiencias en el Caribe Mexicano
                </p>
              </div>
            </div>
          </div>

          <div className="kana-layout-grid">
            {/* Left side - Simple Info Rectangle */}
            <div className="kana-layout-left" style={{
              backgroundImage: `url(${sliderOptions[activeSlide]?.image || '/kana.png'})`
            }}>
              <div className="kana-layout-info-rectangle">
                <div className="info-rectangle-content">
                  <h3 className="info-rectangle-title">{sliderOptions[activeSlide]?.title || 'Selecciona una Experiencia'}</h3>
                  <p className="info-rectangle-description">{sliderOptions[activeSlide]?.description || 'Descripción de la experiencia'}</p>
                  <div className="info-rectangle-category">
                    <span className="material-icons-round">{sliderOptions[activeSlide]?.icon || 'star'}</span>
           
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Slider options */}
            <div className="kana-layout-right">
              <div ref={sliderRef} className="kana-layout-slider">
          

                <div className="kana-layout-carousel">
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    direction="horizontal"
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
                    breakpoints={{
                      320: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                      },
                      768: {
                        slidesPerView: 1,
                        spaceBetween: 15,
                      },
                      1024: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                      }
                    }}
                    onSwiper={(swiper) => { 
                      swiperRef.current = swiper; 
                      setTimeout(() => {
                        swiper.update();
                        swiper.updateSize();
                      }, 100); 
                    }}
                    onSlideChange={(swiper) => handleSlideChange(swiper.activeIndex)}
                    className="kana-layout-swiper"
                    style={{ width: '100%' }}
                  >
                    {sliderOptions.map((option, index) => (
                      <SwiperSlide key={index}>
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

        </div>
      </div>

      {/* <Menu /> */}
    </section>
  );
};
