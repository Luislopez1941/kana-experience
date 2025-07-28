'use client'

import React, { useEffect, useRef, useState } from "react";
import { Header } from "../header/Header";
import { Menu } from "../menu/Menu";
import { gsap } from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./styles/Layout.css";
// import yacht from '../../assets/yacht_01.jpg'

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
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Set initial visible state immediately
    if (imageRef.current && contentRef.current) {
      gsap.set([imageRef.current, contentRef.current], {
        opacity: 1,
        scale: 1,
        x: 0
      });

      console.log('Layout mounted, activeSlide:', activeSlide);
    }
  }, []);

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

    // Quick fade transition
    gsap.to([imageRef.current, contentRef.current], {
      opacity: 0.3,
      duration: 0.2,
      ease: "power2.out",
      onComplete: () => {
        gsap.to([imageRef.current, contentRef.current], {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });

    // Navigate Swiper to match the selection
    if (swiperRef.current && swiperRef.current.activeIndex !== index) {
      swiperRef.current.slideTo(index);
    }
  };

  return (
    <section className="layout">
      <div className="layout-video-container">
        <video
          className="layout-video"
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
        <div className="layout-overlay"></div>
      </div>

      <Header />

      <div className="layout-content">
        <div className="layout-container">
          <div className="layout-grid">
            {/* Left side - Image and content */}
            <div className="layout-left">
              <div className="layout-image-container">
                <img
                  ref={imageRef}
                  src={sliderOptions[activeSlide].image}
                  alt={sliderOptions[activeSlide].title}
                  className="layout-image"
                />
                <div className="layout-image-overlay">
                  <div ref={contentRef} className="layout-image-content">
                    {/* <span className="layout-category">
                      {sliderOptions[activeSlide].category}
                    </span> */}
                    <h2 className="layout-image-title">
                      {sliderOptions[activeSlide].title}
                    </h2>
                    <p className="layout-image-description">
                      {sliderOptions[activeSlide].description}
                    </p>
                    <Link href="/yachts" className="btn btn-primary layout-cta">
                      Explorar Más
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Slider options */}
            <div className="layout-right">
              <div ref={sliderRef} className="layout-slider">
                <h3 className="layout-slider-title">Descubre Nuestras Experiencias</h3>

                <div className="layout-carousel">
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    direction="horizontal"
                    width={null}
                    watchSlidesProgress={true}
                    navigation={{
                      nextEl: ".layout-carousel-next",
                      prevEl: ".layout-carousel-prev",
                    }}
                    pagination={{
                      clickable: true,
                      el: ".layout-carousel-pagination",
                    }}
                    autoplay={{
                      delay: 4000,
                      disableOnInteraction: true,
                    }}
                    onSwiper={(swiper) => { swiperRef.current = swiper; setTimeout(() => swiper.update(), 100); }}
                    onSlideChange={(swiper) => handleSlideChange(swiper.activeIndex)}
                    className="layout-swiper"
                  >
                    {sliderOptions.map((option, index) => (
                      <SwiperSlide key={option.id}>
                        <div
                          className={`layout-option ${index === activeSlide ? 'active' : ''}`}
                          onClick={() => handleSlideChange(index)}
                        >
                          <div className="layout-option-content">
                            <div className="layout-option-icon">
                              <span className="material-icons-round">
                                {option.category === 'Flota' && 'directions_boat'}
                                {option.category === 'Destinos' && 'place'}
                                {option.category === 'Gastronomía' && 'restaurant'}
                                {option.category === 'Actividades' && 'sports_handball'}
                                {option.category === 'Eventos' && 'celebration'}
                              </span>
                            </div>
                            <div className="layout-option-text">
                              <h4 className="layout-option-title">{option.title}</h4>
                              <p className="layout-option-description">{option.description}</p>
                            </div>
                            <div className="layout-option-arrow">
                              <span className="material-icons-round">arrow_forward</span>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* Carousel Controls */}
                  <div className="layout-carousel-controls">
                    <button className="layout-carousel-prev">
                      <span className="material-icons-round">arrow_back</span>
                    </button>
                    <div className="layout-carousel-pagination"></div>
                    <button className="layout-carousel-next">
                      <span className="material-icons-round">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Menu />
    </section>
  );
};
