'use client'

import React, { useState } from "react";
import { Search, Calendar, User, Mail, Phone, MapPin, Clock, CheckCircle, XCircle, AlertCircle, Download, Receipt } from 'lucide-react';
import './ConsultReservation.css';
import LoadingSpinner from './LoadingSpinner';
import APIs from '@/services/APIS';
import ConfigurationAPIs from '@/services/ConfigApi';

interface ReservationData {
  id: number;
  number: number;
  year: number;
  folio: number;
  createdAt: string;
  updatedAt: string;
  reservations: Array<{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    description?: string;
    type: 'yacht' | 'tour' | 'club';
    productId: number;
    quantity: number;
    reservationDate: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt: string;
    updatedAt: string;
    yacht?: {
      id: number;
      name: string;
      capacity: number;
      length: string;
      location: string;
      description: string;
      features: string;
      status: string;
      images: Array<{
        id: number;
        url: string;
      }>;
      pricing: Array<{
        hours: number;
        price: number;
      }>;
      characteristics: Array<{
        id: number;
        name: string;
      }>;
    };
    tour?: any;
    club?: any;
  }>;
}

export default function ConsultReservationPage() {
  const [folio, setFolio] = useState("");
  const [reservation, setReservation] = useState<ReservationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Función wrapper para buscar reserva por folio
  const searchReservationByFolio = async (data: any) => {
    const path = `reservations/by-folio/${data.folio}`;
    return ConfigurationAPIs.get(path);
  };

  const handleSearch = async () => {
    if (!folio.trim()) {
      setError("Por favor ingresa un folio válido");
      return;
    }

    setLoading(true);
    setError("");
    setReservation(null);

    try {
      console.log('Searching for folio:', folio.trim());
      
      const response = await searchReservationByFolio({ folio: folio.trim() });
      console.log('API Response:', response);
      
      if (response && response.reservations && response.reservations.length > 0) {
        setReservation(response);
        setError("");
      } else {
        setError("No se encontró ninguna reserva con ese folio");
        setReservation(null);
      }
    } catch (error) {
      console.error('Error searching reservation:', error);
      setError("Error al buscar la reserva. Por favor intenta de nuevo.");
      setReservation(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFolio("");
    setReservation(null);
    setError("");
  };


  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmada";
      case "pending":
        return "Pendiente de Pago";
      case "cancelled":
        return "Cancelada";
      default:
        return status;
    }
  };

  const getPaymentStatusMessage = (status: string, folio: number) => {
    switch (status) {
      case "confirmed":
        return (
          <div className="payment-status-message payment-status-message--confirmed">
            <div className="payment-status-content">
              <CheckCircle size={20} className="payment-status-icon payment-status-icon--confirmed" />
              <div className="payment-status-text">
                <span className="payment-status-title">Pago confirmado</span>
                <span className="payment-status-subtitle">Su reserva está lista</span>
              </div>
            </div>
            <button 
              className="payment-download-btn"
              onClick={() => handleDownloadReceipt(folio)}
            >
              <Download size={16} />
              <Receipt size={16} />
              Descargar Recibo
            </button>
          </div>
        );
      case "pending":
        return (
          <div className="payment-status-message payment-status-message--pending">
            <Clock size={16} className="payment-status-icon" />
            <span>Esta reserva está pendiente de pago. Los datos de pago se enviaron a su correo electrónico.</span>
          </div>
        );
      case "cancelled":
        return (
          <div className="payment-status-message payment-status-message--cancelled">
            <XCircle size={16} className="payment-status-icon" />
            <span>Reserva cancelada</span>
          </div>
        );
      default:
        return "";
    }
  };

  const handleDownloadReceipt = (folio: number) => {
    // Simular descarga de recibo
    console.log(`Descargando recibo para folio: ${folio}`);
    // Aquí puedes implementar la lógica real de descarga
    alert(`Descargando recibo para folio ${folio}`);
  };

  const getServiceTypeText = (type: string) => {
    switch (type) {
      case "yacht":
        return "Yate";
      case "tour":
        return "Tour";
      case "club":
        return "Club Nocturno";
      default:
        return type;
    }
  };

  return (
    <div className="consult-reservation-page">
      <div className="consult-reservation-container">
        <div className="consult-reservation-header">
          <h1 className="consult-reservation-title">
            Consulta tu Reserva
          </h1>
          <p className="consult-reservation-subtitle">
            Ingresa el folio de tu reserva para ver los detalles
          </p>
        </div>

        <div className="consult-reservation-card">
          <div className={`consult-reservation-search ${loading ? 'consult-reservation-search__loading' : ''}`}>
            <div className="consult-reservation-search__form">
              <input
                type="text"
                value={folio}
                onChange={(e) => setFolio(e.target.value)}
                placeholder="Ingresa tu folio (ej: LY2024001)"
                className="consult-reservation-search__input"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                disabled={loading}
              />
              <button
                onClick={handleSearch}
                disabled={loading}
          className="consult-reservation-search__button"
              >
          <Search size={16} className="consult-reservation-search__button-icon" />
                {loading ? "Buscando..." : "Buscar"}
              </button>
            </div>
            {error && (
              <p className="consult-reservation-search__error">{error}</p>
            )}
          </div>

          {loading && (
            <LoadingSpinner text="Buscando tu reserva" size="medium" />
          )}

          {reservation && !loading && (
            <div className="consult-reservation-result">
              {reservation.reservations.map((res, index) => (
                <div key={res.id} className="consult-reservation-result__grid">
                  <div className="consult-reservation-result__section">
                    <h3 className="consult-reservation-result__section-title">
                    Detalles de la Reserva
                  </h3>
                    <div className="consult-reservation-result__details">
                      <div className="consult-reservation-result__detail">
                        <span className="consult-reservation-result__label">
                          <Calendar size={16} className="consult-reservation-result__icon" />
                          Folio:
                        </span>
                        <span className="consult-reservation-result__value consult-reservation-result__value--folio">
                        {reservation.folio}
                      </span>
                    </div>
                      <div className="consult-reservation-result__detail">
                        <span className="consult-reservation-result__label">
                          <User size={16} className="consult-reservation-result__icon" />
                          Cliente:
                        </span>
                        <span className="consult-reservation-result__value">
                          {res.firstName} {res.lastName}
                        </span>
                      </div>
                      <div className="consult-reservation-result__detail">
                        <span className="consult-reservation-result__label">
                          <Mail size={16} className="consult-reservation-result__icon" />
                          Email:
                        </span>
                        <span className="consult-reservation-result__value">
                          {res.email}
                        </span>
                      </div>
                      <div className="consult-reservation-result__detail">
                        <span className="consult-reservation-result__label">
                          <Phone size={16} className="consult-reservation-result__icon" />
                          Teléfono:
                        </span>
                        <span className="consult-reservation-result__value">
                          {res.phone}
                      </span>
                    </div>
                      <div className="consult-reservation-result__detail">
                        <span className="consult-reservation-result__label">
                          {res.status === 'confirmed' && <CheckCircle size={16} className="consult-reservation-result__icon" />}
                          {res.status === 'pending' && <Clock size={16} className="consult-reservation-result__icon" />}
                          {res.status === 'cancelled' && <XCircle size={16} className="consult-reservation-result__icon" />}
                          Estado:
                        </span>
                        <span className={`consult-reservation-result__value consult-reservation-result__value--${res.status}`}>
                          {getStatusText(res.status)}
                      </span>
                    </div>
                      <div className="consult-reservation-result__detail">
                    
                        <span className={`consult-reservation-result__value consult-reservation-result__value--payment-${res.status}`}>
                          {getPaymentStatusMessage(res.status, reservation.folio)}
                        </span>
                    </div>
                  </div>
                </div>

                  <div className="consult-reservation-result__section">
                    <h3 className="consult-reservation-result__section-title">
                      Información del Servicio
                  </h3>
                    <div className="consult-reservation-result__details">
                      <div className="consult-reservation-result__detail">
                        <span className="consult-reservation-result__label">
                          <MapPin size={16} className="consult-reservation-result__icon" />
                          Tipo de Servicio:
                        </span>
                        <span className="consult-reservation-result__value">
                          {getServiceTypeText(res.type)}
                      </span>
                    </div>
                      <div className="consult-reservation-result__detail">
                        <span className="consult-reservation-result__label">
                          <Calendar size={16} className="consult-reservation-result__icon" />
                          Fecha de Reservación:
                        </span>
                        <span className="consult-reservation-result__value">
                          {new Date(res.reservationDate).toLocaleDateString("es-ES", {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                      </span>
                    </div>
                      <div className="consult-reservation-result__detail">
                        <span className="consult-reservation-result__label">
                          <User size={16} className="consult-reservation-result__icon" />
                          Cantidad de Personas:
                        </span>
                        <span className="consult-reservation-result__value">
                          {res.quantity} personas
                      </span>
                    </div>
                      <div className="consult-reservation-result__detail">
                        <span className="consult-reservation-result__label">
                          <CheckCircle size={16} className="consult-reservation-result__icon" />
                          ID del Producto:
                        </span>
                        <span className="consult-reservation-result__value consult-reservation-result__value--total">
                          #{res.productId}
                      </span>
                      </div>
                    </div>
                  </div>

                  {/* Información del Producto */}
                  {res.yacht && (
                    <div className="consult-reservation-result__section">
                      <h3 className="consult-reservation-result__section-title">
                        Información del Yate
                      </h3>
                      <div className="consult-reservation-result__details">
                        <div className="consult-reservation-result__detail">
                          <span className="consult-reservation-result__label">
                            <MapPin size={16} className="consult-reservation-result__icon" />
                            Nombre:
                          </span>
                          <span className="consult-reservation-result__value">
                            {res.yacht.name}
                          </span>
                        </div>
                        <div className="consult-reservation-result__detail">
                          <span className="consult-reservation-result__label">
                            <User size={16} className="consult-reservation-result__icon" />
                            Capacidad:
                          </span>
                          <span className="consult-reservation-result__value">
                            {res.yacht.capacity} personas
                          </span>
                </div>
                        <div className="consult-reservation-result__detail">
                          <span className="consult-reservation-result__label">
                            <MapPin size={16} className="consult-reservation-result__icon" />
                            Ubicación:
                          </span>
                          <span className="consult-reservation-result__value">
                            {res.yacht.location}
                          </span>
              </div>
                        <div className="consult-reservation-result__detail">
                          <span className="consult-reservation-result__label">
                            <CheckCircle size={16} className="consult-reservation-result__icon" />
                            Eslora:
                          </span>
                          <span className="consult-reservation-result__value">
                            {res.yacht.length} pies
                      </span>
                        </div>
                  </div>
                </div>
              )}

                  {/* Peticiones Especiales */}
                  {res.description && (
                    <div className="consult-reservation-services">
                      <h4 className="consult-reservation-services__title">
                        Peticiones Especiales
                      </h4>
                      <div className="consult-reservation-services__list">
                        <span className="consult-reservation-services__item">
                          {res.description}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <div className="consult-reservation-actions">
                <button
                  onClick={handleReset}
                  className="consult-reservation-actions__button"
                >
                  Nueva Búsqueda
                </button>
              </div>
            </div>
          )}

          {!reservation && !loading && !error && (
            <div className="consult-reservation-examples">
              <p className="consult-reservation-examples__text">
                Ingresa el folio de tu reserva para ver los detalles
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}