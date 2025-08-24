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
      name: "Yate de Lujo",
      description: "El máximo confort y elegancia",
      image: "/sections-main/yacht.jpg",
    },
    {
      name: "Tour Exclusivo",
      description: "Experiencias únicas en aguas cristalinas",
      image: "/sections-main/tour.jpg",
    },
    {
      name: "Party en el Mar",
      description: "Celebración y diversión en alta mar",
      image: "/sections-main/party.jpg",
    }
  ];

  return (
    <section id="destinos" className="destinations">
      <div className="destinations-container">
        <div className="destinations-header">
          <h2 className="destinations-title">Nuestras mejores experiencias</h2>
          <p className="destinations-description">
            Explora las diferentes experiencias que tenemos para ti en Cancún
          </p>
        </div>
        <div className="destinations-slider">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]} spaceBetween={20} slidesPerView={1}
            navigation={{
              nextEl: ".destinations-next",
              prevEl: ".destinations-prev",
            }}
            pagination={{
              clickable: true,
              el: ".destinations-pagination",
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              375: {
                slidesPerView: 1.2,
                spaceBetween: 10,
              },
              480: {
                slidesPerView: 1.3,
                spaceBetween: 15,
              },
              640: {
                slidesPerView: 1.4,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 1.8,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 2.2,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 2.5,
                spaceBetween: 30,
              },
            }}
            className="destinations-swiper"
          >
            {destinations.map((destination, index) => (
              <SwiperSlide key={index}>
                <div className="destination-card">
                  <div className="destination-image">
                    <img src={destination.image} alt={destination.name} />
                  </div>
                  <div className="destination-content">
                    <h3 className="destination-name">{destination.name}</h3>
                    <p className="destination-description">
                      {destination.description}
                    </p>
                  </div>
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
