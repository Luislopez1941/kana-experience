'use client'

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles/ExperiencePackages.css";
import APIs from "@/services/APIS";
import useStore from "@/zustand/useStore";

export const ExperiencePackages: React.FC = () => {
  const { url_server } = useStore();
  const [packages, setPackages] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await APIs.getTourByTourType(1);
      console.log('Tours response:', response);
      setPackages(response.data || []);
    } catch (error) {
      console.error('Error fetching tours:', error);
      setError('Error al cargar los tours');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  return (
    <section id="experiencias" className="packages">
      <div className="packages-container">
        <div className="packages-header">
          <h2 className="packages-title">Paquetes de Experiencia</h2>
          <p className="packages-description">
            Experiencias curadas para cada ocasión especial
          </p>
        </div>

        {loading && (
          <div className="packages-loading">
            <span className="material-icons-round spinning">refresh</span>
            Cargando experiencias...
          </div>
        )}

        {error && (
          <div className="packages-error">
            <span className="material-icons-round">error</span>
            {error}
          </div>
        )}

        {!loading && !error && packages.length === 0 && (
          <div className="packages-empty">
            <span className="material-icons-round">info</span>
            No hay experiencias disponibles
          </div>
        )}

        {!loading && !error && packages.length > 0 && (
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
            {packages.map((pkg: any, index: any) => (
              <SwiperSlide key={index}>
                <div className="package-card">
                  <div className="package-image">
                    {pkg.images && pkg.images.length > 0 ? (
                      <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={0}
                        slidesPerView={1}
                        navigation={{
                          nextEl: `.package-${pkg.id}-next`,
                          prevEl: `.package-${pkg.id}-prev`,
                        }}
                        pagination={{
                          clickable: true,
                          el: `.package-${pkg.id}-pagination`,
                        }}
                        autoplay={{
                          delay: 4000,
                          disableOnInteraction: false,
                        }}
                        className="package-images-swiper"
                      >
                        {pkg.images.map((image: any, imageIndex: number) => (
                          <SwiperSlide key={imageIndex}>
                            <img
                              src={`${url_server}/${image.url}`}
                              alt={`${pkg.name} - Imagen ${imageIndex + 1}`}
                              className="package-image-slide"
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    ) : (
                      <div className="image-placeholder">
                        <span className="material-icons-round">explore</span>
                      </div>
                    )}
                    <div className="package-location">{pkg.location}</div>
                    
                    {/* Controles del carrusel de imágenes */}
                    {pkg.images && pkg.images.length > 1 && (
                      <>
                        <button className={`package-image-prev package-${pkg.id}-prev`}>
                          <span className="material-icons-round">arrow_back</span>
                        </button>
                        <button className={`package-image-next package-${pkg.id}-next`}>
                          <span className="material-icons-round">arrow_forward</span>
                        </button>
                        <div className={`package-image-pagination package-${pkg.id}-pagination`}></div>
                      </>
                    )}
                  </div>
                  
                  <div className="package-info">
                    <h3 className="package-name">{pkg.name}</h3>
                    <div className="package-specs">
                      <span className="package-spec">
                        <span className="material-icons-round">people</span>
                        {pkg.capacity} personas
                      </span>
                      <span className="package-spec">
                        <span className="material-icons-round">place</span>
                        {pkg.location}
                      </span>
                    </div>
                    
                    {pkg.description && (
                      <p className="package-description">
                        {pkg.description.length > 100 
                          ? `${pkg.description.substring(0, 100)}...` 
                          : pkg.description}
                      </p>
                    )}
                    
                    {pkg.characteristics && pkg.characteristics.length > 0 && (
                      <div className="package-characteristics">
                        {pkg.characteristics.slice(0, 3).map((characteristic: any, index: number) => (
                          <span key={characteristic.id} className="characteristic-tag">
                            {characteristic.name}
                          </span>
                        ))}
                        {pkg.characteristics.length > 3 && (
                          <span className="characteristic-more">
                            +{pkg.characteristics.length - 3} más
                          </span>
                        )}
                      </div>
                    )}
                    
                    <div className="package-footer">
                      <span className="package-price">
                        ${pkg.price?.toLocaleString() || pkg.price}
                        <span className="package-currency"> MXN</span>
                      </span>
                      <button className="package-details-button">
                        Ver Detalles
                      </button>
                    </div>
                  </div>
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
        )}
      </div>
    </section>
  );
};
