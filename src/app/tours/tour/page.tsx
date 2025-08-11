'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TourDetails from '@/components/tours/TourDetails';
import Loading from '@/components/loading/Loading';
import APIs from '@/services/APIS';
import useStore from '@/zustand/useStore';

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

  // Transform the API data to match the TourDetails component interface
  const transformedTour = {
    id: tour.id,
    name: tour.name,
    description: tour.description,
    pricing: tour.pricing || [],
    location: tour.location,
    price: tour.pricing && tour.pricing.length > 0 
      ? `$${tour.pricing[0].precio.toLocaleString()}` 
      : 'Precio no disponible',
    priceNumber: tour.pricing && tour.pricing.length > 0 
      ? tour.pricing[0].precio 
      : 0,
    image: tour.images && tour.images.length > 0 
      ? tour.images[0].url 
      : '/tours_01.jpg',
    images: tour.images && tour.images.length > 0 
      ? tour.images.map(img => img.url)
      : ['/tours_01.jpg'],
    features: tour.characteristics ? tour.characteristics.map(c => c.name) : [],
    type: tour.tourCategory?.name || 'Tour',
    duracion: tour.duracion,
    horarios: tour.horarios,
    edadMinima: tour.edadMinima,
    transportacion: tour.transportacion
  };

  return (
    <div className="tour-details-page">
      <div className="tour-details-container">
        <TourDetails tour={transformedTour} />
      </div>
    </div>
  );
};

export default TourDetailsPage;
