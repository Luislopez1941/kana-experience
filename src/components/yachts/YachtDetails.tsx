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
    // Navegar al formulario de reserva con el ID del yate
    router.push(`/reservation?type=yacht&id=${yacht.id}`);
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

      <div className="yacht-details-navigation-container">
        <div className="yacht-details-navigation-bar">
          <div className="yacht-details-navigation-separator"></div>
          <div className="yacht-details-navigation-item" onClick={() => router.push('/yachts')}>
            <span>Yates</span>
          </div>
          <div className="yacht-details-navigation-separator"></div>
          <div className="yacht-details-navigation-item" onClick={() => router.push('/tours')}>
            <span>Tours</span>
          </div>
          <div className="yacht-details-navigation-separator"></div>
          <div className="yacht-details-navigation-item" onClick={() => router.push('/clubs')}>
            <span>Clubs Nocturnos</span>
          </div>
          <div className="yacht-details-navigation-separator"></div>
          <div className="yacht-details-navigation-item" onClick={() => router.push('/about')}>
            <span>Sobre Nosotros</span>
          </div>
          <div className="yacht-details-navigation-separator"></div>
          <div className="yacht-details-navigation-item" onClick={() => router.push('/contact')}>
            <span>Contacto</span>
          </div>
        </div>
      </div>

      {/* Hero Section - Two Column Layout */}
      <section className="yacht-details-hero">
        <div className="yacht-details-container">
          <div className="yacht-details-grid">
            {/* Left Column - Main Image */}
            <div className="yacht-details-image-column">
              <div className="yacht-details-main-image">
                <img 
                  src={yacht.image} 
                  alt={`${yacht.name} - Imagen principal`}
                  onClick={() => openModal(0)}
                  className="yacht-main-photo"
                />
                <div className="yacht-badge">{yacht.type}</div>
                <button className="yacht-expand-btn" onClick={() => openModal(0)}>
                  <Maximize2 size={24} />
                </button>
              </div>
            </div>

            {/* Right Column - Yacht Information */}
            <div className="yacht-details-info-column">
              <div className="yacht-details-info">
                <h1 className="yacht-details-title">{yacht.name}</h1>
                <p className="yacht-details-subtitle">Yates Cancun de lujo</p>
                
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

                {/* Características horizontales */}
                {yacht.characteristics && yacht.characteristics.length > 0 && (
                  <div className="yacht-details-characteristics">
                    <div className="characteristics-grid">
                      {yacht.characteristics.map((characteristic, index) => (
                        <div key={index} className="characteristic-item">
                          <CheckCircle size={16} />
                          <span>{characteristic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="yacht-details-gallery">
        <div className="yacht-details-container">
          <div className="yacht-gallery-grid">
            {images.slice(0, 4).map((image, index) => (
              <div 
                key={index} 
                className="yacht-gallery-item"
                onClick={() => openModal(index)}
              >
                <img 
                  src={image} 
                  alt={`${yacht.name} - Galería ${index + 1}`}
                  className="gallery-image"
                />
              </div>
            ))}
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