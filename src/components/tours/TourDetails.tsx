'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { 
  ArrowLeft, 
  ArrowRight, 
  Maximize2, 
  X, 
  Calendar, 
  MessageCircle,
  CheckCircle,
  Users,
  MapPin,
  Clock
} from 'lucide-react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './TourDetails.css';

interface TourDetailsProps {
  tour: {
    id: number;
    name: string;
    description: string;
    pricing?: Array<{ personas: number; precio: number }>;
    location: string;
    price: string;
    priceNumber: number;
    image: string;
    images?: string[];
    features: string[];
    type: string;
    duracion?: string;
    horarios?: string;
    edadMinima?: string;
    transportacion?: string;
  };
}

const TourDetails: React.FC<TourDetailsProps> = ({ tour }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Array de imágenes para el carrusel
  const images = tour.images || [tour.image, tour.image, tour.image, tour.image];

  const handleWhatsApp = () => {
    const message = `Hola! Me interesa el tour ${tour.name} (${tour.price}/evento). ¿Podrían darme más información?`;
    window.open(`https://wa.me/5219988776655?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleReserve = () => {
    // Aquí iría la lógica de reserva
    console.log('Reservar tour:', tour.id);
  };

  const openModal = (index: number) => {
    setSelectedImage(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="tour-details-page">
      {/* Header */}
      <header className="tour-details-header">
        <div className="tour-details-header-container">
          <button 
            onClick={() => router.back()}
            className="tour-back-btn"
          >
            <ArrowLeft size={20} />
            Volver
          </button>

          <Link href="/consult-reservation" className="tour-reserve-btn">
            Consultar Reserva
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="tour-details-hero">
        <div className="tour-details-container">
          <div className="tour-details-image">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              navigation={{
                nextEl: '.tour-details-next',
                prevEl: '.tour-details-prev',
              }}
              pagination={{
                clickable: true,
                el: '.tour-details-pagination',
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              className="tour-details-swiper"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img 
                    src={image} 
                    alt={`${tour.name} - Imagen ${index + 1}`}
                    onClick={() => openModal(index)}
                    className="tour-details-slide"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Controles del carrusel */}
            {images.length > 1 && (
              <>
                <button className="tour-details-prev tour-details-nav">
                  <ArrowLeft size={24} />
                </button>
                <button className="tour-details-next tour-details-nav">
                  <ArrowRight size={24} />
                </button>
                <div className="tour-details-pagination"></div>
              </>
            )}
            
            <div className="tour-badge">{tour.type}</div>
            <button className="tour-expand-btn" onClick={() => openModal(0)}>
              <Maximize2 size={24} />
            </button>
          </div>

          <div className="tour-details-info">
            <h1 className="tour-details-title">{tour.name}</h1>
            <p className="tour-details-description">{tour.description}</p>
            
            <div className="tour-details-specs">
              {tour.duracion && (
                <div className="tour-spec">
                  <Clock size={20} />
                  <span>{tour.duracion}</span>
                </div>
              )}
              <div className="tour-spec">
                <MapPin size={20} />
                <span>{tour.location}</span>
              </div>
              {tour.edadMinima && (
                <div className="tour-spec">
                  <Users size={20} />
                  <span>{tour.edadMinima}</span>
                </div>
              )}
            </div>

            <div className="tour-details-price">
              <span className="tour-price-amount">{tour.price}</span>
              <span className="tour-price-period">MXN/tour</span>
            </div>

            <div className="tour-details-actions">
              <button onClick={handleReserve} className="tour-btn-primary">
                <Calendar size={20} />
                Reservar Ahora
              </button>
              <button onClick={handleWhatsApp} className="tour-btn-secondary">
                <MessageCircle size={20} />
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="tour-details-features">
        <div className="tour-details-container">
          <h2 className="tour-section-title">Características Incluidas</h2>
          <div className="tour-features-grid">
            {tour.features.map((feature, index) => (
              <div key={index} className="tour-feature-item">
                <CheckCircle size={20} />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="tour-details-additional">
        <div className="tour-details-container">
          <h2 className="tour-section-title">Información Adicional</h2>
          <div className="tour-additional-info">
            <div className="tour-info-item">
              <h3>Experiencia Única</h3>
              <p>Disfruta de una experiencia única con guías especializados y conoce los lugares más espectaculares. Perfecto para crear recuerdos inolvidables.</p>
            </div>
            <div className="tour-info-item">
              <h3>Servicios Incluidos</h3>
              <p>Transporte, guía turístico, equipo necesario, y todo lo requerido para una experiencia segura y divertida.</p>
            </div>
            <div className="tour-info-item">
              <h3>Horarios Disponibles</h3>
              <p>{tour.horarios || 'Tours disponibles todos los días. Consulta horarios específicos al hacer tu reserva.'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal para ver imagen en grande */}
      {showModal && (
        <div className="tour-image-modal" onClick={closeModal}>
          <div className="tour-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="tour-modal-close" onClick={closeModal}>
              <X size={24} />
            </button>
            <div className="tour-modal-image-container">
              <img src={images[selectedImage]} alt={`${tour.name} - Imagen ${selectedImage + 1}`} />
            </div>
            <div className="tour-modal-navigation">
              <button 
                className="tour-modal-nav-btn" 
                onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : images.length - 1)}
              >
                <ArrowLeft size={24} />
              </button>
              <span className="tour-modal-counter">{selectedImage + 1} / {images.length}</span>
              <button 
                className="tour-modal-nav-btn" 
                onClick={() => setSelectedImage(selectedImage < images.length - 1 ? selectedImage + 1 : 0)}
              >
                <ArrowRight size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourDetails;
