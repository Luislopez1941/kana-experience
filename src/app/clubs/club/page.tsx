'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ClubDetails from '@/components/clubs/ClubDetails';
import Loading from '@/components/loading/Loading';
import APIs from '@/services/APIS';
import useStore from '@/zustand/useStore';

interface Club {
  id: number;
  name: string;
  description: string;
  address: string;
  characteristics: string[];
  images: Array<{ url: string }>;
  locality: { id: number; name: string; municipalityId: number };
  localityId: number;
  municipality: { id: number; name: string; stateId: number };
  municipalityId: number;
  state: { id: number; name: string };
  stateId: number;
  type: { id: number; name: string };
  typeId: number;
  createdAt: string;
  updatedAt: string;
}

const ClubDetailsPage = () => {
  const router = useRouter();
  const [club, setClub] = useState<Club | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { url_server } = useStore();

  useEffect(() => {
    const fetchClub = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching club details...');
        // Aquí puedes cambiar el ID por el que necesites o hacer una petición diferente
        const response = await APIs.getClubsById(1); // Cambia el 1 por el ID que necesites
        console.log('API Response:', response);
        
        // La API puede devolver los datos directamente o dentro de response.data
        const clubData = response.data || response;
        console.log('Club data:', clubData);
        
        if (clubData && clubData.id) {
          setClub(clubData);
        } else {
          setError('No se pudo cargar la información del club');
        }
      } catch (err) {
        console.error('Error fetching club:', err);
        setError('Error al cargar la información del club');
      } finally {
        setLoading(false);
      }
    };

    fetchClub();
  }, []);

  if (loading) {
    return (
      <div className="club-details-page">
        <div className="club-details-container">
          <Loading text="Cargando información del club..." />
        </div>
      </div>
    );
  }

  if (error || !club) {
    return (
      <div className="club-details-page">
        <div className="club-details-container">
          <div className="error-container">
            <h1>Club no encontrado</h1>
            <p>{error || 'El club que buscas no existe.'}</p>
            <button 
              onClick={() => router.push('/clubs')}
              className="back-to-clubs-btn"
            >
              Volver a Clubs
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Transform the API data to match the ClubDetails component interface
  const transformedClub = {
    id: club.id,
    name: club.name,
    description: club.description,
    capacity: 0, // No hay capacity en la nueva estructura
    price: 'Consultar precio',
    priceNumber: 0,
    image: club.images && club.images.length > 0 
      ? `${url_server}${club.images[0].url}` 
      : '/party.jpg',
    images: club.images && club.images.length > 0 
      ? club.images.map(img => `${url_server}${img.url}`)
      : ['/party.jpg'],
    features: club.characteristics || ['Ambiente exclusivo', 'Música en vivo', 'Bar completo'],
    type: club.type?.name || 'Club',
    location: `${club.address}, ${club.locality?.name}, ${club.municipality?.name}`,
    pricing: [], // No hay pricing en la nueva estructura
    characteristics: club.characteristics || [],
    clubCategory: club.type,
    clubCategoryId: club.typeId
  };

  return (
    <div className="club-details-page">
      <div className="club-details-container">
        <ClubDetails club={transformedClub} />
      </div>
    </div>
  );
};

export default ClubDetailsPage;
