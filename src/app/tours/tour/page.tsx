'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/loading/Loading';
import APIs from '@/services/APIS';
import useStore from '@/zustand/useStore';
import Link from 'next/link';

interface Tour {
  id: number;
  name: string;
  description: string;
  pricing?: Array<{ personas: number; precio: number }>;
  location: string;
  status: string;
  horarios?: string;
  duracion?: string;
  edadMinima?: string;
  transportacion?: string;
  tourCategoryId: number;
  tourCategory?: { id: number; name: string };
  images?: Array<{ url: string }>;
  characteristics?: Array<{ name: string }>;
}

const TourDetailsPage = () => {
  const router = useRouter();
  const { url_server } = useStore();
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching tour details...');
        const response = await APIs.getToursById(1); // Cambia el 1 por el ID que necesites
        console.log('API Response:', response);
        
        // La API puede devolver los datos directamente o dentro de response.data
        const tourData = response.data || response;
        console.log('Tour data:', tourData);
        
        if (tourData && tourData.id) {
          setTour(tourData);
        } else {
          setError('No se pudo cargar la información del tour');
        }
      } catch (err) {
        console.error('Error fetching tour:', err);
        setError('Error al cargar la información del tour');
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, []);

  if (loading) {
    return (
      <div className="tour-details-page">
        <div className="tour-details-container">
          <Loading text="Cargando información del tour..." />
        </div>
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="tour-details-page">
        <div className="tour-details-container">
          <div className="error-container">
            <h1>Tour no encontrado</h1>
            <p>{error || 'El tour que buscas no existe.'}</p>
            <button 
              onClick={() => router.push('/tours')}
              className="back-to-tours-btn"
            >
              Volver a Tours
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tour-details-page">
      <div className="tour-details-container">
        <div className="tour-details-header">
          <button 
            onClick={() => router.push('/tours')}
            className="back-btn"
          >
            <span className="material-icons-round">arrow_back</span>
            Volver a Tours
          </button>
        </div>

        <div className="tour-details-content">
          <div className="tour-images">
            {tour.images && tour.images.length > 0 ? (
              <div className="tour-image-gallery">
                {tour.images.map((image, index) => (
                  <img 
                    key={index}
                    src={`${url_server}${image.url}`}
                    alt={`${tour.name} - Imagen ${index + 1}`}
                    className="tour-image"
                  />
                ))}
              </div>
            ) : (
              <img src="/tour_01.jpg" alt={tour.name} className="tour-image" />
            )}
          </div>

          <div className="tour-info-details">
            <h1 className="tour-title">{tour.name}</h1>
            <p className="tour-description">{tour.description}</p>

            <div className="tour-specs-details">
              <div className="spec-item">
                <span className="material-icons-round">place</span>
                <span><strong>Ubicación:</strong> {tour.location}</span>
              </div>
              
              {tour.duracion && (
                <div className="spec-item">
                  <span className="material-icons-round">schedule</span>
                  <span><strong>Duración:</strong> {tour.duracion}</span>
                </div>
              )}

              {tour.horarios && (
                <div className="spec-item">
                  <span className="material-icons-round">access_time</span>
                  <span><strong>Horarios:</strong> {tour.horarios}</span>
                </div>
              )}

              {tour.edadMinima && (
                <div className="spec-item">
                  <span className="material-icons-round">person</span>
                  <span><strong>Edad mínima:</strong> {tour.edadMinima}</span>
                </div>
              )}

              {tour.transportacion && (
                <div className="spec-item">
                  <span className="material-icons-round">directions_bus</span>
                  <span><strong>Transportación:</strong> {tour.transportacion}</span>
                </div>
              )}
            </div>

            {tour.characteristics && tour.characteristics.length > 0 && (
              <div className="tour-characteristics-details">
                <h3>Características del Tour</h3>
                <div className="characteristics-grid">
                  {tour.characteristics.map((characteristic, index) => (
                    <span key={index} className="characteristic-item">
                      {characteristic.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {tour.pricing && tour.pricing.length > 0 && (
              <div className="tour-pricing-details">
                <h3>Precios</h3>
                <div className="pricing-grid">
                  {tour.pricing.map((price, index) => (
                    <div key={index} className="pricing-item">
                      <span className="price-persons">{price.personas} personas</span>
                      <span className="price-amount">${price.precio.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="tour-actions-details">
              <Link href="/reservation" className="btn btn-primary">
                <span className="material-icons-round">calendar_month</span>
                Reservar Tour
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailsPage;
