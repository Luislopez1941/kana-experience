'use client'

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles/Destinations.css";

export const Destinations: React.FC = () => {
  const destinations = [
    {
      name: "Cancún & Isla Mujeres",
      description: "Aguas cristalinas y arrecifes de coral",
      icon: "beach_access",
    },
    {
      name: "Playa del Carmen",
      description: "Cenotes y la Riviera Maya",
      icon: "nature",
    },
    {
      name: "Los Cabos",
      description: "El Arco y Mar de Cortés",
      icon: "landscape",
    },
    {
      name: "Puerto Vallarta",
      description: "Bahías escondidas del Pacífico",
      icon: "water",
    },
    {
      name: "Tulum",
      description: "Ruinas mayas y cenotes sagrados",
      icon: "temple_hindu",
    },
    {
      name: "Cozumel",
      description: "Paraíso del buceo mundial",
      icon: "scuba_diving",
    },
  ];

  return (
    <section id="destinos" className="destinations">
      <div className="destinations-container">
        <div className="destinations-header">
          <h2 className="destinations-title">Destinos Paradisíacos</h2>
          <p className="destinations-description">
            Explora los destinos más exclusivos de México a bordo de nuestros
            yates de lujo
          </p>
        </div>

        <div className="destinations-slider">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: ".destinations-next",
              prevEl: ".destinations-prev",
            }}
            pagination={{
              clickable: true,
              el: ".destinations-pagination",
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="destinations-swiper"
          >
            {destinations.map((destination, index) => (
              <SwiperSlide key={index}>
                <div className="destination-card">
                  <div className="destination-icon">
                    <span className="material-icons-round">
                      {destination.icon}
                    </span>
                  </div>
                  <h3 className="destination-name">{destination.name}</h3>
                  <p className="destination-description">
                    {destination.description}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="destinations-prev">
            <span className="material-icons-round">arrow_back</span>
          </button>
          <button className="destinations-next">
            <span className="material-icons-round">arrow_forward</span>
          </button>

          <div className="destinations-controls">
            <div className="destinations-pagination"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
