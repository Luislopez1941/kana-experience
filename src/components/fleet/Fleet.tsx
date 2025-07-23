'use client'

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles/Fleet.css";

export const Fleet: React.FC = () => {
  const yachts = [
    {
      name: "Serenidad del Caribe",
      length: "45m",
      guests: "12",
      price: "$380,000",
      location: "Cancún",
    },
    {
      name: "Perla de Cortés",
      length: "38m",
      guests: "10",
      price: "$280,000",
      location: "Los Cabos",
    },
    {
      name: "Majestic Riviera",
      length: "52m",
      guests: "16",
      price: "$520,000",
      location: "Puerto Vallarta",
    },
    {
      name: "Azul Mexicano",
      length: "42m",
      guests: "14",
      price: "$350,000",
      location: "Playa del Carmen",
    },
    {
      name: "Sol Dorado",
      length: "35m",
      guests: "8",
      price: "$220,000",
      location: "Cancún",
    },
    {
      name: "Viento del Mar",
      length: "48m",
      guests: "14",
      price: "$450,000",
      location: "Los Cabos",
    },
  ];

  return (
    <section id="flota" className="fleet">
      <div className="fleet-container">
        <div className="fleet-header">
          <h2 className="fleet-title">Nuestra Flota Premium</h2>
          <p className="fleet-description">
            Yates de lujo diseñados para superar tus expectativas
          </p>
        </div>

        <div className="fleet-slider">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: ".fleet-next",
              prevEl: ".fleet-prev",
            }}
            pagination={{
              clickable: true,
              el: ".fleet-pagination",
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="fleet-swiper"
          >
            {yachts.map((yacht, index) => (
              <SwiperSlide key={index}>
                <div className="yacht-card">
                  <div className="yacht-image">
                    <div className="image-placeholder">
                      <span className="material-icons-round">sailing</span>
                    </div>
                    <div className="yacht-location">{yacht.location}</div>
                  </div>
                  <div className="yacht-info">
                    <h3 className="yacht-name">{yacht.name}</h3>
                    <div className="yacht-specs">
                      <span className="yacht-spec">
                        <span className="material-icons-round">straighten</span>
                        {yacht.length}
                      </span>
                      <span className="yacht-spec">
                        <span className="material-icons-round">people</span>
                        {yacht.guests} huéspedes
                      </span>
                    </div>
                    <div className="yacht-footer">
                      <span className="yacht-price">
                        {yacht.price}
                        <span className="yacht-currency"> MXN/día</span>
                      </span>
                      <button className="btn btn-outline yacht-button">
                        Ver Detalles
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="fleet-prev">
            <span className="material-icons-round">arrow_back</span>
          </button>
          <button className="fleet-next">
            <span className="material-icons-round">arrow_forward</span>
          </button>

          <div className="fleet-controls">
            <div className="fleet-pagination"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
