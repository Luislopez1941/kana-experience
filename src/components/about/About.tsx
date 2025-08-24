'use client'

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles/About.css";

export const About: React.FC = () => {
  return (
    <section id="nosotros" className="about">
      <div className="about-container">
        <div className="about-grid">
          <div className="about-content">
            <h2 className="about-title">DETRÁS DE LA EXPERIENCIA</h2>
            
            <p className="about-text">
              En Kaná Experience creemos que cada viaje no solo es un
              destino, sino una historia que se vive y se recuerda. Detrás
              de cada experiencia hay un equipo apasionado que
              comparte la misma visión: hacer que disfrutes sin
              preocuparte por nada.
            </p>
            
            <p className="about-text">
              Somos una mezcla de ideas, talentos y personalidades que
              se complementan. Nos une la pasión por el mar, la
              aventura y los momentos que se quedan para siempre en la
              memoria. Cada uno aporta algo único, y juntos formamos la
              energía que impulsa a Kaná.
            </p>
            
            <p className="about-text">
              Más que un equipo, somos una familia que disfruta lo que
              hace, y eso se nota en cada sonrisa, cada recomendación y
              cada detalle que cuidamos para ti.
            </p>
            
            <p className="about-text">
              <strong>servicio impecable, atención personalizada y una vibra que no se encuentra en otro lugar.</strong>
            </p>
            
            <p className="about-text">
              Y fotografías de nosotros, obviamente más profesionales o casuales (esto dara confianza de ver una cara humana)
            </p>
          </div>
          <div className="about-image">
            <div className="about-carousel">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={{
                  nextEl: ".about-carousel-next",
                  prevEl: ".about-carousel-prev",
                }}
                pagination={{
                  clickable: true,
                  el: ".about-carousel-pagination",
                }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                loop={true}
                className="about-swiper"
                style={{ width: '100%', height: '100%' }}
              >
                <SwiperSlide>
                  <div className="about-carousel-slide">
                    <img 
                      src="/kana.png" 
                      alt="Equipo Kaná 1" 
                      className="about-carousel-image"
                      onError={(e) => {
                        e.currentTarget.src = '/kana.png';
                      }}
                    />
                    <div className="about-carousel-overlay">
                      <h3 className="about-carousel-overlay-title">Nuestro Equipo</h3>
                      <p className="about-carousel-overlay-text">Profesionales apasionados por el mar</p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="about-carousel-slide">
                    <img 
                      src="/yacht_01.jpg" 
                      alt="Equipo Kaná 2" 
                      className="about-carousel-image"
                      onError={(e) => {
                        e.currentTarget.src = '/yacht_01.jpg';
                      }}
                    />
                    <div className="about-carousel-overlay">
                      <h3 className="about-carousel-overlay-title">Experiencias Únicas</h3>
                      <p className="about-carousel-overlay-text">Creando momentos inolvidables</p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="about-carousel-slide">
                    <img 
                      src="/tours_01.jpg" 
                      alt="Equipo Kaná 3" 
                      className="about-carousel-image"
                      onError={(e) => {
                        e.currentTarget.src = '/tours_01.jpg';
                      }}
                    />
                    <div className="about-carousel-overlay">
                      <h3 className="about-carousel-overlay-title">Pasión por el Servicio</h3>
                      <p className="about-carousel-overlay-text">Dedicados a tu satisfacción</p>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
              
              {/* Controles del carrusel */}
              <button className="about-carousel-prev" type="button">
                <span className="material-icons-round">arrow_back</span>
              </button>
              <button className="about-carousel-next" type="button">
                <span className="material-icons-round">arrow_forward</span>
              </button>
              <div className="about-carousel-pagination"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
