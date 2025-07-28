'use client'

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles/Fleet.css";
import APIs from "@/services/APIS";
import useStore from "@/zustand/useStore";

export const Fleet: React.FC = () => {
  const [yachts, setYachts] = useState([])
  const { url_server } = useStore();
  const fetch = async () => {
    const response = await APIs.getYachtByYachtType(1);
    setYachts(response.data);
  }

  useEffect(() => {
    fetch();
  }, []);

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
            {yachts.map((yacht: any, index) => (
              <SwiperSlide key={index}>
                <div className="yacht-card">
                  <div className="yacht-image">
                    {yacht.images && yacht.images.length > 0 ? (
                      <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={0}
                        slidesPerView={1}
                        navigation={{
                          nextEl: `.yacht-${yacht.id}-next`,
                          prevEl: `.yacht-${yacht.id}-prev`,
                        }}
                        pagination={{
                          clickable: true,
                          el: `.yacht-${yacht.id}-pagination`,
                        }}
                        autoplay={{
                          delay: 4000,
                          disableOnInteraction: false,
                        }}
                        className="yacht-images-swiper"
                      >
                        {yacht.images.map((image: any, imageIndex: number) => (
                          <SwiperSlide key={imageIndex}>
                            <img
                              src={`${url_server}/${image.url}`}
                              alt={`${yacht.name} - Imagen ${imageIndex + 1}`}
                              className="yacht-image-slide"
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    ) : (
                      <div className="image-placeholder">
                        <span className="material-icons-round">sailing</span>
                      </div>
                    )}
                    <div className="yacht-location">{yacht.location}</div>
                    
                    {/* Controles del carrusel de imágenes */}
                    {yacht.images && yacht.images.length > 1 && (
                      <>
                        <button className={`yacht-image-prev yacht-${yacht.id}-prev`}>
                          <span className="material-icons-round">arrow_back</span>
                        </button>
                        <button className={`yacht-image-next yacht-${yacht.id}-next`}>
                          <span className="material-icons-round">arrow_forward</span>
                        </button>
                        <div className={`yacht-image-pagination yacht-${yacht.id}-pagination`}></div>
                      </>
                    )}
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
                        {yacht.capacity} huéspedes
                      </span>
                      <span className="yacht-spec">
                        <span className="material-icons-round">place</span>
                        {yacht.location}
                      </span>
                    </div>
                    {yacht.description && (
                      <p className="yacht-description">
                        {yacht.description.length > 100 
                          ? `${yacht.description.substring(0, 100)}...` 
                          : yacht.description}
                      </p>
                    )}
                    
                    {yacht.characteristics && yacht.characteristics.length > 0 && (
                      <div className="yacht-characteristics">
                        {yacht.characteristics.slice(0, 3).map((characteristic: any, index: number) => (
                          <span key={characteristic.id} className="characteristic-tag">
                            {characteristic.name}
                          </span>
                        ))}
                        {yacht.characteristics.length > 3 && (
                          <span className="characteristic-more">
                            +{yacht.characteristics.length - 3} más
                          </span>
                        )}
                      </div>
                    )}
                    
                    <div className="yacht-footer">
                      <span className="yacht-price">
                        ${yacht.pricePerDay?.toLocaleString() || yacht.pricePerDay}
                        <span className="yacht-currency"> MXN/día</span>
                      </span>
                      <button className="yacht-details-button">
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
