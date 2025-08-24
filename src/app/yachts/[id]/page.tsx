'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import YachtDetails from '@/components/yachts/YachtDetails';
import Loading from '@/components/loading/Loading';
import APIs from '@/services/APIS';
import useStore from '@/zustand/useStore';

interface Yacht {
  id: number;
  name: string;
  description: string;
  capacity: number;
  length: string;
  location: string;
  pricing: Array<{ hora: number; precio: number }>;
  characteristics: string[];
  features: string[];
  images: Array<{ url: string }>;
  yachtCategory: {
    id: number;
    name: string;
  };
  yachtCategoryId: number;
}

const YachtDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const [yacht, setYacht] = useState<Yacht | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { url_server } = useStore();

  const yachtId = params?.id ? parseInt(params.id as string) : null;

  useEffect(() => {
    const fetchYacht = async () => {
      if (!yachtId) {
        setError('ID de yate no válido');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching yacht details for ID:', yachtId);
        const response = await APIs.getYachtsById(yachtId);
        console.log('API Response:', response);
        
        // La API puede devolver los datos directamente o dentro de response.data
        const yachtData = response.data || response;
        console.log('Yacht data:', yachtData);
        
        if (yachtData && yachtData.id) {
          setYacht(yachtData);
        } else {
          setError('No se pudo cargar la información del yate');
        }
      } catch (err) {
        console.error('Error fetching yacht:', err);
        setError('Error al cargar la información del yate');
      } finally {
        setLoading(false);
      }
    };

    fetchYacht();
  }, [yachtId]);

  if (loading) {
    return (
      <div className="yacht-details-page">
        <div className="yacht-details-container">
          <Loading text="Cargando información del yate..." />
        </div>
      </div>
    );
  }

  if (error || !yacht) {
    return (
      <div className="yacht-details-page">
        <div className="yacht-details-container">
          <div className="error-container">
            <h1>Yate no encontrado</h1>
            <p>{error || 'El yate que buscas no existe.'}</p>
            <button 
              onClick={() => router.push('/yachts')}
              className="back-to-yachts-btn"
            >
              Volver a Yates
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Transform the API data to match the YachtDetails component interface
  const transformedYacht = {
    id: yacht.id,
    name: yacht.name,
    description: yacht.description,
    capacity: yacht.capacity,
    price: yacht.pricing && yacht.pricing.length > 0 
      ? `$${yacht.pricing[0].precio.toLocaleString()}` 
      : 'Precio no disponible',
    priceNumber: yacht.pricing && yacht.pricing.length > 0 
      ? yacht.pricing[0].precio 
      : 0,
    image: yacht.images && yacht.images.length > 0 
      ? yacht.images[0].url 
      : '/yacht_01.jpg',
    images: yacht.images && yacht.images.length > 0 
      ? yacht.images.map(img => img.url)
      : ['/yacht_01.jpg'],
    features: [...(yacht.characteristics || []), ...(yacht.features || [])],
    length: yacht.length,
    type: yacht.yachtCategory?.name || 'Yacht',
    location: yacht.location,
    pricing: yacht.pricing || [],
    characteristics: yacht.characteristics || [],
    yachtCategory: yacht.yachtCategory,
    yachtCategoryId: yacht.yachtCategoryId
  };

  return (
    <div className="yacht-details-page">
      <div className="yacht-details-container">
        <YachtDetails yacht={transformedYacht} />
      </div>
    </div>
  );
};

export default YachtDetailsPage; 