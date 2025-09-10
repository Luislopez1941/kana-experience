'use client'

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import { Anchor, User, Calendar, MapPin, Users, Globe, CheckCircle, Mail, Phone, FileText, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import APIs from '../../services/APIS';
import './Reservation.css';

interface ReservationData {
  yacht: string;
  startDate: string;
  endDate: string;
  guests: number;
  destination: string;
  customerName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  specialRequests: string;
  language: string;
}

interface ProductData {
  id: number;
  name: string;
  description?: string;
  price?: number;
  image?: string;
  images?: Array<{ id: number; url: string }>;
  capacity?: number;
  type: 'yacht' | 'tour' | 'club';
  // Campos específicos para yates
  length?: string;
  location?: string;
  features?: string;
  characteristics?: Array<{
    id: number;
    name: string;
    yachtId: number;
  }>;
}

function ReservationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [productType, setProductType] = useState<'yacht' | 'tour' | 'club'>('yacht');
  const [productId, setProductId] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [reservationData, setReservationData] = useState<any>(null);
  const [formData, setFormData] = useState<ReservationData>({
    yacht: '',
    startDate: '',
    endDate: '',
    guests: 1,
    destination: '',
    customerName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    specialRequests: '',
    language: 'es'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Cargar datos del producto desde parámetros de URL
  useEffect(() => {
    const type = searchParams.get('type') as 'yacht' | 'tour' | 'club' | null;
    const id = searchParams.get('id');
    
    if (type && id) {
      const productId = parseInt(id);
      if (!isNaN(productId)) {
        setProductType(type);
        setProductId(productId);
        loadProductData(type, productId);
      }
    }
  }, [searchParams]);

  const handleInputChange = (field: keyof ReservationData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };


  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.customerName) newErrors.customerName = 'Nombre requerido';
      if (!formData.lastName) newErrors.lastName = 'Apellido requerido';
      if (!formData.email) newErrors.email = 'Email requerido';
      if (!formData.phone) newErrors.phone = 'Teléfono requerido';
    } else if (step === 2) {
      if (!formData.startDate) newErrors.startDate = 'Fecha requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Función para cargar datos del producto
  const loadProductData = async (type: 'yacht' | 'tour' | 'club', id: number) => {
    setIsLoadingProduct(true);
    try {
      let response;
      
      switch (type) {
        case 'yacht':
          response = await APIs.getYachtsById(id);
          break;
        case 'tour':
          response = await APIs.getToursById(id);
          break;
        case 'club':
          response = await APIs.getClubsById(id);
          break;
        default:
          throw new Error('Tipo de producto no válido');
      }

      if (response.data) {
        const product = response.data;
        
        // Manejar diferentes estructuras según el tipo de producto
        let productInfo;
        
        if (type === 'yacht') {
          // Estructura específica para yates
          const firstImage = product.images && product.images.length > 0 ? product.images[0].url : null;
          const firstPricing = product.pricing && product.pricing.length > 0 ? product.pricing[0] : null;
          
          productInfo = {
            id: product.id,
            name: product.name,
            description: product.description,
            price: firstPricing ? firstPricing.price : null,
            image: firstImage,
            images: product.images || [],
            capacity: product.capacity,
            type: type,
            length: product.length,
            location: product.location,
            features: product.features,
            characteristics: product.characteristics || []
          };
        } else {
          // Estructura genérica para tours y clubs
          productInfo = {
            id: product.id,
            name: product.name || product.title || 'Producto',
            description: product.description,
            price: product.price,
            image: product.image || product.photo,
            capacity: product.capacity || product.maxGuests,
            type: type
          };
        }
        
        setProductData(productInfo);
        
        // Actualizar el nombre del producto en el formulario
        setFormData(prev => ({
          ...prev,
          yacht: productInfo.name
        }));
      }
    } catch (error) {
      console.error('Error al cargar datos del producto:', error);
      alert('Error al cargar los datos del producto');
    } finally {
      setIsLoadingProduct(false);
    }
  };

  // Función para cambiar el tipo de producto (yacht, tour, club)
  // Uso: setProductTypeAndId('yacht', 5) para reservar el yate con ID 5
  // Uso: setProductTypeAndId('tour', 3) para reservar el tour con ID 3
  // Uso: setProductTypeAndId('club', 2) para reservar el club con ID 2
  const setProductTypeAndId = (type: 'yacht' | 'tour' | 'club', id: number) => {
    setProductType(type);
    setProductId(id);
    loadProductData(type, id);
  };

  const handleAcceptReservation = () => {
    router.push('/');
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(3) && !isSubmitting) {
      setIsSubmitting(true);
      
      // Crear objeto para enviar al backend según el modelo Reservation
      const reservationData = {
        firstName: formData.customerName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        reservationDate: new Date(formData.startDate).toISOString(),
        quantity: formData.guests,
        description: formData.specialRequests || null,
        productId: productId,
        type: productType,
        qr: null, // Se generará en el backend
        status: 'pending',
        userId: 1, // ID del usuario - puedes obtenerlo del contexto de autenticación
        // Relaciones opcionales según el tipo de producto
        yachtId: productType === 'yacht' ? productId : null,
        tourId: productType === 'tour' ? productId : null,
        clubId: productType === 'club' ? productId : null
      };

      console.log('Reservation data to send to backend:', reservationData);
      
      try {
        // Llamada al API usando el servicio
        const response = await APIs.createReservation(reservationData);
        
        if (response && response.status === 'success') {
          console.log('Reservation created successfully:', response);
          setReservationData(response);
          setReservationSuccess(true);
        } else {
          throw new Error('No se recibió respuesta del servidor');
        }
      } catch (error) {
        console.error('Error al enviar la reserva:', error);
        // Mostrar error sin alert
        setErrors({ submit: 'Error al enviar la reserva. Por favor, inténtalo de nuevo.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const availableYachts = [
    'DOUBLE D 51',
    'SERENIDAD DEL CARIBE',
    'PERLA DE CORTÉS',
    'MAJESTIC RIVIERA'
  ];


  const countries = [
    'México', 'Estados Unidos', 'Canadá', 'España', 'Francia', 'Alemania',
    'Italia', 'Reino Unido', 'Argentina', 'Brasil', 'Colombia', 'Chile'
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="reservation-form__section">
            <h2 className="reservation-form__section-title">
              <User size={20} className="reservation-form__icon" />
              INFORMACIÓN PERSONAL
            </h2>
            <div className="reservation-form__field-group">
              <div className="reservation-form__field">
                <label className="reservation-form__label">Nombre(s)</label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                  className={`reservation-form__input ${errors.customerName ? 'reservation-form__input--error' : ''}`}
                />
                {errors.customerName && <span className="reservation-form__error">{errors.customerName}</span>}
              </div>
              <div className="reservation-form__field">
                <label className="reservation-form__label">Apellido</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={`reservation-form__input ${errors.lastName ? 'reservation-form__input--error' : ''}`}
                />
                {errors.lastName && <span className="reservation-form__error">{errors.lastName}</span>}
              </div>
            </div>

            <div className="reservation-form__field-group">
              <div className="reservation-form__field">
                <label className="reservation-form__label">Correo Electrónico</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`reservation-form__input ${errors.email ? 'reservation-form__input--error' : ''}`}
                />
                {errors.email && <span className="reservation-form__error">{errors.email}</span>}
              </div>
              <div className="reservation-form__field">
                <label className="reservation-form__label">Teléfono</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`reservation-form__input ${errors.phone ? 'reservation-form__input--error' : ''}`}
                />
                {errors.phone && <span className="reservation-form__error">{errors.phone}</span>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="reservation-form__section">
            <h2 className="reservation-form__section-title">
              <Calendar size={20} className="reservation-form__icon" />
              DETALLES DEL VIAJE
            </h2>

            <div className="reservation-form__field">
              <label className="reservation-form__label">Fecha</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className={`reservation-form__input ${errors.startDate ? 'reservation-form__input--error' : ''}`}
              />
              {errors.startDate && <span className="reservation-form__error">{errors.startDate}</span>}
            </div>

            <div className="reservation-form__field">
              <label className="reservation-form__label">Cantidad de Personas</label>
              <div className="reservation-form__passenger-control">
                <button 
                  type="button"
                  onClick={() => handleInputChange('guests', Math.max(1, formData.guests - 1))}
                  className="reservation-form__passenger-btn"
                >-</button>
                <span className="reservation-form__passenger-count">{formData.guests}</span>
                <button 
                  type="button"
                  onClick={() => handleInputChange('guests', formData.guests + 1)}
                  className="reservation-form__passenger-btn"
                >+</button>
              </div>
            </div>

            <div className="reservation-form__field">
              <label className="reservation-form__label">Peticiones Especiales</label>
              <textarea
                value={formData.specialRequests}
                onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                placeholder="Cuéntanos si tienes alguna petición especial..."
                className="reservation-form__textarea"
                rows={4}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="reservation-form__section">
            <h2 className="reservation-form__section-title">
              <CheckCircle size={20} className="reservation-form__icon" />
              CONFIRMACIÓN Y PAGO
            </h2>
            <div className="reservation-form__confirmation">
              <h3>Resumen de tu Reserva</h3>
              <div className="reservation-form__summary">
                <p><strong>Cliente:</strong> {formData.customerName} {formData.lastName}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Teléfono:</strong> {formData.phone}</p>
                <p><strong>Fecha:</strong> {formData.startDate}</p>
                <p><strong>Pasajeros:</strong> {formData.guests}</p>
                {formData.specialRequests && (
                  <p><strong>Peticiones:</strong> {formData.specialRequests}</p>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Pantalla de confirmación de reserva
  if (reservationSuccess && reservationData) {
    return (
      <div className="reservation-success-page">
        <div className="reservation-success-container">
          <div className="reservation-success-card">
            <div className="reservation-success-header">
              <div className="reservation-success-icon">
                <CheckCircle size={48} />
              </div>
              <h1 className="reservation-success-title">¡Reserva Confirmada!</h1>
              <p className="reservation-success-subtitle">
                Tu reservación ha sido procesada exitosamente
              </p>
            </div>

            <div className="reservation-success-content">
              <div className="reservation-success-folio">
                <div className="reservation-success-folio-label">Número de Folio</div>
                <div className="reservation-success-folio-number">
                  #{reservationData.folio}
                </div>
              </div>

              <div className="reservation-success-details">
                <h3 className="reservation-success-section-title">Detalles de la Reservación</h3>
                
                <div className="reservation-success-info-grid">
                  <div className="reservation-success-info-item">
                    <User size={20} className="reservation-success-info-icon" />
                    <div className="reservation-success-info-content">
                      <span className="reservation-success-info-label">Cliente</span>
                      <span className="reservation-success-info-value">
                        {reservationData.data.firstName} {reservationData.data.lastName}
                      </span>
                    </div>
                  </div>

                  <div className="reservation-success-info-item">
                    <Mail size={20} className="reservation-success-info-icon" />
                    <div className="reservation-success-info-content">
                      <span className="reservation-success-info-label">Email</span>
                      <span className="reservation-success-info-value">
                        {reservationData.data.email}
                      </span>
                    </div>
                  </div>

                  <div className="reservation-success-info-item">
                    <Phone size={20} className="reservation-success-info-icon" />
                    <div className="reservation-success-info-content">
                      <span className="reservation-success-info-label">Teléfono</span>
                      <span className="reservation-success-info-value">
                        {reservationData.data.phone}
                      </span>
                    </div>
                  </div>

                  <div className="reservation-success-info-item">
                    <Calendar size={20} className="reservation-success-info-icon" />
                    <div className="reservation-success-info-content">
                      <span className="reservation-success-info-label">Fecha de Reservación</span>
                      <span className="reservation-success-info-value">
                        {new Date(reservationData.data.reservationDate).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="reservation-success-info-item">
                    <Users size={20} className="reservation-success-info-icon" />
                    <div className="reservation-success-info-content">
                      <span className="reservation-success-info-label">Cantidad de Personas</span>
                      <span className="reservation-success-info-value">
                        {reservationData.data.quantity} personas
                      </span>
                    </div>
                  </div>

                  <div className="reservation-success-info-item">
                    <FileText size={20} className="reservation-success-info-icon" />
                    <div className="reservation-success-info-content">
                      <span className="reservation-success-info-label">Tipo de Servicio</span>
                      <span className="reservation-success-info-value">
                        {reservationData.data.type === 'yacht' ? 'Yate' : 
                         reservationData.data.type === 'tour' ? 'Tour' : 'Club Nocturno'}
                      </span>
                    </div>
                  </div>
                </div>

                {reservationData.data.description && (
                  <div className="reservation-success-description">
                    <h4 className="reservation-success-description-title">Peticiones Especiales</h4>
                    <p className="reservation-success-description-text">
                      {reservationData.data.description}
                    </p>
                  </div>
                )}
              </div>

              <div className="reservation-success-email-notice">
                <Mail size={24} className="reservation-success-email-icon" />
                <div className="reservation-success-email-content">
                  <h4 className="reservation-success-email-title">Confirmación por Email</h4>
                  <p className="reservation-success-email-text">
                    Hemos enviado los detalles de tu reservación y el folio #{reservationData.folio} a tu correo electrónico: <strong>{reservationData.data.email}</strong>
                  </p>
                  <p className="reservation-success-email-subtext">
                    Revisa tu bandeja de entrada y la carpeta de spam si no recibes el email en los próximos minutos.
                  </p>
                </div>
              </div>

              <div className="reservation-success-actions">
                <button 
                  onClick={handleAcceptReservation}
                  className="reservation-success-accept-btn"
                >
                  <ArrowRight size={20} />
                  Continuar al Inicio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reservation-page">
      <div className="reservation-container">
        <div className="reservation-grid">
          {/* Left Column - Form */}
          <div className="reservation-form">
            <h1 className="reservation-form__title">
              {currentStep}. {currentStep === 1 ? 'INFORMACIÓN PERSONAL' : 
                            currentStep === 2 ? 'DETALLES DEL VIAJE' : 
                            'CONFIRMACIÓN Y PAGO'}
            </h1>

            {/* Progress Bar */}
            <div className="reservation-form__progress">
              <div className="reservation-form__progress-bar">
                <div 
                  className="reservation-form__progress-fill" 
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>
              </div>
              <div className="reservation-form__progress-steps">
                <span className={currentStep >= 1 ? 'active' : ''}>1</span>
                <span className={currentStep >= 2 ? 'active' : ''}>2</span>
                <span className={currentStep >= 3 ? 'active' : ''}>3</span>
              </div>
            </div>

            {renderStepContent()}

            <div className="reservation-form__actions">
              {currentStep > 1 && (
                <button type="button" className="reservation-form__btn-secondary" onClick={prevStep}>
                  Anterior
                </button>
              )}
              {currentStep < 3 ? (
                <button type="button" className="reservation-form__btn-primary" onClick={nextStep}>
                  Siguiente
                </button>
              ) : (
                <div>
                  <button
                    type="submit"
                    className="reservation-form__btn-primary"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'ENVIANDO...' : 'CONFIRMAR RESERVA'}
                  </button>
                  {errors.submit && (
                    <div className="reservation-form__error-message">
                      {errors.submit}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Service Summary */}
          <div className="reservation-summary">
            <div className="reservation-summary__image-container">
              {isLoadingProduct ? (
                <div className="reservation-summary__loading">
                  <div className="reservation-summary__spinner"></div>
                  <p>Cargando información...</p>
                </div>
              ) : productData?.images && productData.images.length > 1 ? (
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={0}
                  slidesPerView={1}
                  navigation={true}
                  pagination={{ clickable: true }}
                  className="reservation-summary__swiper"
                >
                  {productData.images.map((image, index) => (
                    <SwiperSlide key={image.id || index}>
                      <img 
                        src={image.url} 
                        alt={`${productData.name} - Imagen ${index + 1}`} 
                        className="reservation-summary__yacht-image" 
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <img 
                  src={productData?.images && productData.images.length > 0 
                    ? productData.images[0].url 
                    : productData?.image || "/yacht_main.jpg"} 
                  alt={productData?.name || "Producto"} 
                  className="reservation-summary__yacht-image" 
                />
              )}
            </div>

            <div className="reservation-summary__details">
              <h3 className="reservation-summary__title">
                {productData?.name || 'Servicio'}
              </h3>
              {productData?.description && (
                <p className="reservation-summary__description">{productData.description}</p>
              )}
              
              {/* Información específica del yate */}
              {productData?.type === 'yacht' && (
                <div className="reservation-summary__yacht-specs">
                  {productData.length && (
                    <div className="reservation-summary__spec">
                      <span className="reservation-summary__spec-label">Eslora:</span>
                      <span className="reservation-summary__spec-value">{productData.length} pies</span>
                    </div>
                  )}
                  {productData.location && (
                    <div className="reservation-summary__spec">
                      <span className="reservation-summary__spec-label">Ubicación:</span>
                      <span className="reservation-summary__spec-value">{productData.location}</span>
                    </div>
                  )}
                  {productData.features && (
                    <div className="reservation-summary__spec">
                      <span className="reservation-summary__spec-label">Características:</span>
                      <span className="reservation-summary__spec-value">{productData.features}</span>
                    </div>
                  )}
                </div>
              )}
              
              <div className="reservation-summary__info">
                <div className="reservation-summary__row">
                  <span className="reservation-summary__label">Fecha:</span>
                  <span className="reservation-summary__value">
                    {formData.startDate || 'No especificada'}
                  </span>
                </div>
                <div className="reservation-summary__row">
                  <span className="reservation-summary__label">Pasajeros:</span>
                  <div className="reservation-summary__passengers">
                    <button 
                      onClick={() => handleInputChange('guests', Math.max(1, formData.guests - 1))}
                      className="reservation-summary__passenger-btn"
                    >-</button>
                    <span className="reservation-summary__passenger-count">{formData.guests}</span>
                    <button 
                      onClick={() => handleInputChange('guests', formData.guests + 1)}
                      className="reservation-summary__passenger-btn"
                    >+</button>
                  </div>
                </div>
                {productData?.capacity && (
                  <div className="reservation-summary__row">
                    <span className="reservation-summary__label">Capacidad:</span>
                    <span className="reservation-summary__value">{productData.capacity} personas</span>
                  </div>
                )}
                {productData?.price && (
                  <div className="reservation-summary__row">
                    <span className="reservation-summary__label">Precio:</span>
                    <span className="reservation-summary__value">${productData.price.toLocaleString()} MXN</span>
                  </div>
                )}
                {formData.specialRequests && (
                  <div className="reservation-summary__row">
                    <span className="reservation-summary__label">Peticiones:</span>
                    <span className="reservation-summary__value">{formData.specialRequests}</span>
                  </div>
                )}
              </div>
              
              {/* Características incluidas para yates */}
              {productData?.type === 'yacht' && productData.characteristics && productData.characteristics.length > 0 && (
                <div className="reservation-summary__characteristics">
                  <h4 className="reservation-summary__characteristics-title">Incluye:</h4>
                  <div className="reservation-summary__characteristics-list">
                    {productData.characteristics.slice(0, 4).map((characteristic) => (
                      <span key={characteristic.id} className="reservation-summary__characteristic-item">
                        {characteristic.name}
                      </span>
                    ))}
                    {productData.characteristics.length > 4 && (
                      <span className="reservation-summary__characteristic-more">
                        +{productData.characteristics.length - 4} más
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReservationPage() {
  return (
    <Suspense fallback={
      <div className="reservation-page">
        <div className="reservation-container">
          <div className="reservation-loading">
            <div className="reservation-loading__spinner"></div>
            <p>Cargando formulario de reserva...</p>
          </div>
        </div>
      </div>
    }>
      <ReservationContent />
    </Suspense>
  );
}
