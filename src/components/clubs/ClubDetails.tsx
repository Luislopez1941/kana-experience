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
  Music
} from 'lucide-react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './ClubDetails.css';

interface ClubDetailsProps {
  club: {
    id: number;
    name: string;
    description: string;
    capacity: number;
    price: string;
    priceNumber: number;
    image: string;
    images?: string[];
    features: string[];
    type: string;
    location: string;
  };
}

const ClubDetails: React.FC<ClubDetailsProps> = ({ club }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Array de imágenes para el carrusel
  const images = club.images || [club.image, club.image, club.image, club.image];

  const handleWhatsApp = () => {
    const message = `Hola! Me interesa el club ${club.name} (${club.price}/evento). ¿Podrían darme más información?`;
    window.open(`https://wa.me/5219988776655?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleReserve = () => {
    // Navegar al formulario de reserva con el ID del club
    router.push(`/reservation?type=club&id=${club.id}`);
  };

  const openModal = (index: number) => {
    setSelectedImage(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="club-details-page">
      {/* Header */}
      <header className="club-details-header">
        <div className="club-details-header-container">
          <button 
            onClick={() => router.back()}
            className="club-back-btn"
          >
            <ArrowLeft size={20} />
            Volver
          </button>

          <Link href="/consult-reservation" className="club-reserve-btn">
            Consultar Reserva
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="club-details-hero">
        <div className="club-details-container">
          <div className="club-details-image">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              navigation={{
                nextEl: '.club-details-next',
                prevEl: '.club-details-prev',
              }}
              pagination={{
                clickable: true,
                el: '.club-details-pagination',
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              className="club-details-swiper"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img 
                    src={image} 
                    alt={`${club.name} - Imagen ${index + 1}`}
                    onClick={() => openModal(index)}
                    className="club-details-slide"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Controles del carrusel */}
            {images.length > 1 && (
              <>
                <button className="club-details-prev club-details-nav">
                  <ArrowLeft size={24} />
                </button>
                <button className="club-details-next club-details-nav">
                  <ArrowRight size={24} />
                </button>
                <div className="club-details-pagination"></div>
              </>
            )}
            
            <div className="club-badge">{club.type}</div>
            <button className="club-expand-btn" onClick={() => openModal(0)}>
              <Maximize2 size={24} />
            </button>
          </div>

          <div className="club-details-info">
            <h1 className="club-details-title">{club.name}</h1>
            <p className="club-details-description">{club.description}</p>
            
            <div className="club-details-specs">
              <div className="club-spec">
                <Users size={20} />
                <span>{club.capacity} personas</span>
              </div>
              <div className="club-spec">
                <MapPin size={20} />
                <span>{club.location}</span>
              </div>
              <div className="club-spec">
                <Music size={20} />
                <span>Ambiente Exclusivo</span>
              </div>
            </div>

            <div className="club-details-actions">
              <button onClick={handleReserve} className="club-btn-primary">
                <Calendar size={20} />
                Reservar Ahora
              </button>
              <button onClick={handleWhatsApp} className="club-btn-secondary">
                <MessageCircle size={20} />
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="club-details-features">
        <div className="club-details-container">
          <h2 className="club-section-title">Características Incluidas</h2>
          <div className="club-features-grid">
            {club.features.map((feature, index) => (
              <div key={index} className="club-feature-item">
                <CheckCircle size={20} />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="club-details-additional">
        <div className="club-details-container">
          <h2 className="club-section-title">Información Adicional</h2>
          <div className="club-additional-info">
            <div className="club-info-item">
              <h3>Experiencia VIP</h3>
              <p>Disfruta de una experiencia VIP exclusiva con nuestro servicio de primera clase. Ambiente sofisticado y atención personalizada para tu evento especial.</p>
            </div>
            <div className="club-info-item">
              <h3>Servicios Incluidos</h3>
              <p>Mesa reservada, servicio de mesero, música, iluminación especial, y todo lo necesario para una experiencia inolvidable.</p>
            </div>
            <div className="club-info-item">
              <h3>Horarios Disponibles</h3>
              <p>Eventos disponibles desde las 8:00 PM hasta las 3:00 AM. Reservas con 48 horas de anticipación.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal para ver imagen en grande */}
      {showModal && (
        <div className="club-image-modal" onClick={closeModal}>
          <div className="club-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="club-modal-close" onClick={closeModal}>
              <X size={24} />
            </button>
            <div className="club-modal-image-container">
              <img src={images[selectedImage]} alt={`${club.name} - Imagen ${selectedImage + 1}`} />
            </div>
            <div className="club-modal-navigation">
              <button 
                className="club-modal-nav-btn" 
                onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : images.length - 1)}
              >
                <ArrowLeft size={24} />
              </button>
              <span className="club-modal-counter">{selectedImage + 1} / {images.length}</span>
              <button 
                className="club-modal-nav-btn" 
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

export default ClubDetails;
