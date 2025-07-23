'use client'

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles/ExperiencePackages.css";

export const ExperiencePackages: React.FC = () => {
  const packages = [
    {
      name: "Romance & Luna de Miel",
      duration: "3 días / 2 noches",
      price: "$45,000",
      features: [
        "Cena romántica bajo las estrellas",
        "Spa privado a bordo",
        "Snorkel en arrecifes privados",
        "Fotografía profesional",
      ],
      icon: "favorite",
    },
    {
      name: "Aventura Familiar",
      duration: "5 días / 4 noches",
      price: "$85,000",
      features: [
        "Actividades para todas las edades",
        "Deportes acuáticos incluidos",
        "Visita a cenotes y playas vírgenes",
        "Chef especializado en cocina mexicana",
      ],
      icon: "family_restroom",
    },
    {
      name: "Eventos Corporativos",
      duration: "Personalizable",
      price: "Desde $120,000",
      features: [
        "Salas de juntas flotantes",
        "Catering gourmet",
        "Actividades de team building",
        "Tecnología de última generación",
      ],
      icon: "business_center",
    },
    {
      name: "Celebración de Cumpleaños",
      duration: "1 día / 1 noche",
      price: "$35,000",
      features: [
        "Decoración personalizada",
        "DJ y sistema de sonido",
        "Pastel y catering especial",
        "Actividades acuáticas",
      ],
      icon: "cake",
    },
    {
      name: "Retiro de Bienestar",
      duration: "4 días / 3 noches",
      price: "$65,000",
      features: [
        "Clases de yoga al amanecer",
        "Terapias de spa",
        "Comida saludable gourmet",
        "Meditación en mar abierto",
      ],
      icon: "spa",
    },
  ];

  return (
    <section id="experiencias" className="packages">
      <div className="packages-container">
        <div className="packages-header">
          <h2 className="packages-title">Paquetes de Experiencia</h2>
          <p className="packages-description">
            Experiencias curadas para cada ocasión especial
          </p>
        </div>

        <div className="packages-slider">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: ".packages-next",
              prevEl: ".packages-prev",
            }}
            pagination={{
              clickable: true,
              el: ".packages-pagination",
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="packages-swiper"
          >
            {packages.map((pkg, index) => (
              <SwiperSlide key={index}>
                <div className="package-card">
                  <div className="package-icon">
                    <span className="material-icons-round">{pkg.icon}</span>
                  </div>
                  <h3 className="package-name">{pkg.name}</h3>
                  <div className="package-duration">{pkg.duration}</div>
                  <div className="package-price">
                    {pkg.price}
                    <span className="package-currency"> MXN</span>
                  </div>
                  <ul className="package-features">
                    {pkg.features.map((feature, fIndex) => (
                      <li key={fIndex} className="package-feature">
                        <span className="material-icons-round feature-check">
                          check_circle
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="btn btn-primary package-button">
                    Reservar Experiencia
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="packages-prev">
            <span className="material-icons-round">arrow_back</span>
          </button>
          <button className="packages-next">
            <span className="material-icons-round">arrow_forward</span>
          </button>

          <div className="packages-controls">
            <div className="packages-pagination"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
