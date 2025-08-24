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
  Ruler,
  Users,
  MapPin
} from 'lucide-react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './YachtDetails.css';

interface YachtDetailsProps {
  yacht: {
    id: number;
    name: string;
    description: string;
    capacity: number;
    price: string;
    priceNumber: number;
    image: string;
    images?: string[];
    features: string[];
    characteristics?: string[];
    length: string;
    type: string;
  };
}

const YachtDetails: React.FC<YachtDetailsProps> = ({ yacht }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Array de imágenes para el carrusel
  const images = yacht.images || [yacht.image, yacht.image, yacht.image, yacht.image];

  const handleWhatsApp = () => {
    const message = `Hola! Me interesa el yacht ${yacht.name} (${yacht.price}/día). ¿Podrían darme más información?`;
    window.open(`https://wa.me/5219988776655?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleReserve = () => {
    // Aquí iría la lógica de reserva
    console.log('Reservar yacht:', yacht.id);
  };

  const openModal = (index: number) => {
    setSelectedImage(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="yacht-details-page">
      {/* Header */}
      <header className="yacht-details-header">
        <div className="yacht-details-header-container">
                      <button 
              onClick={() => router.back()}
              className="back-btn"
            >
              <ArrowLeft size={20} />
              Volver
            </button>

            <Link href="/consult-reservation" className="reserve-btn">
              
              Consultar Reserva
            </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="yacht-details-hero">
        <div className="yacht-details-container">
          <div className="yacht-details-image">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              navigation={{
                nextEl: '.yacht-details-next',
                prevEl: '.yacht-details-prev',
              }}
              pagination={{
                clickable: true,
                el: '.yacht-details-pagination',
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              className="yacht-details-swiper"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img 
                    src={image} 
                    alt={`${yacht.name} - Imagen ${index + 1}`}
                    onClick={() => openModal(index)}
                    className="yacht-details-slide"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Controles del carrusel */}
            {images.length > 1 && (
              <>
                <button className="yacht-details-prev yacht-details-nav">
                  <ArrowLeft size={24} />
                </button>
                <button className="yacht-details-next yacht-details-nav">
                  <ArrowRight size={24} />
                </button>
                <div className="yacht-details-pagination"></div>
              </>
            )}
            
            <div className="yacht-badge">{yacht.type}</div>
            <button className="yacht-expand-btn" onClick={() => openModal(0)}>
              <Maximize2 size={24} />
            </button>
          </div>

          <div className="yacht-details-info">
            <h1 className="yacht-details-title">{yacht.name}</h1>
            <p className="yacht-details-description">{yacht.description}</p>
            
            <div className="yacht-details-specs">
              <div className="yacht-spec">
                <Ruler size={20} />
                <span>{yacht.length}</span>
              </div>
              <div className="yacht-spec">
                <Users size={20} />
                <span>{yacht.capacity} personas</span>
              </div>
              <div className="yacht-spec">
                <MapPin size={20} />
                <span>Puerto Banús</span>
              </div>
            </div>

            <div className="yacht-details-price">
              <span className="price-amount">{yacht.price}</span>
              <span className="price-period">MXN/día</span>
            </div>

            <div className="yacht-details-actions">
              <button onClick={handleReserve} className="btn-primary">
                <Calendar size={20} />
                Reservar Ahora
              </button>
              <button onClick={handleWhatsApp} className="btn-secondary">
                <MessageCircle size={20} />
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="yacht-details-features">
        <div className="yacht-details-container">
          <h2 className="section-title">Características Incluidas</h2>
          <div className="features-grid">
            {yacht.characteristics && yacht.characteristics.map((characteristic, index) => (
              <div key={index} className="feature-item">
                <CheckCircle size={20} />
                <span>{characteristic}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="yacht-details-additional">
        <div className="yacht-details-container">
          <h2 className="section-title">Información Adicional</h2>
          <div className="additional-info">
            <div className="info-item">
              <h3>Experiencia de Navegación</h3>
              <p>Disfruta de una experiencia de navegación de lujo con nuestro capitán profesional y tripulación experta. Navegamos por las aguas cristalinas de Cancún y la Riviera Maya.</p>
            </div>
            <div className="info-item">
              <h3>Servicios Incluidos</h3>
              <p>Equipo de snorkel, toallas, bebidas no alcohólicas, música y todo lo necesario para una experiencia inolvidable en el mar.</p>
            </div>
            <div className="info-item">
              <h3>Horarios Disponibles</h3>
              <p>Salidas diarias desde las 9:00 AM hasta las 6:00 PM. Reservas con 24 horas de anticipación.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal para ver imagen en grande */}
      {showModal && (
        <div className="image-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <X size={24} />
            </button>
            <div className="modal-image-container">
              <img src={images[selectedImage]} alt={`${yacht.name} - Imagen ${selectedImage + 1}`} />
            </div>
            <div className="modal-navigation">
              <button 
                className="modal-nav-btn" 
                onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : images.length - 1)}
              >
                <ArrowLeft size={24} />
              </button>
              <span className="modal-counter">{selectedImage + 1} / {images.length}</span>
              <button 
                className="modal-nav-btn" 
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

export default YachtDetails; 