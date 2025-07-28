'use client'

import React from 'react';
import { useParams } from 'next/navigation';
import YachtDetails from '@/components/yachts/YachtDetails';

// Datos de ejemplo - en producción vendrían de una API
const yachtData = {
  1: {
    id: 1,
    name: "Azimut Grande",
    description: "Yacht de lujo con diseño italiano y tecnología de vanguardia. Perfecto para experiencias inolvidables en el mar con comodidades de primera clase.",
    capacity: 12,
    price: "$8,500",
    priceNumber: 8500,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800&h=600&fit=crop"
    ],
    features: ["Chef privado", "Jacuzzi", "Bar completo", "Equipo de snorkel", "Capitán profesional", "Tripulación experta"],
    length: "95 pies",
    type: "Motor Yacht"
  },
  2: {
    id: 2,
    name: "Sunseeker Predator",
    description: "Velocidad y elegancia en perfecta armonía. Ideal para aventuras de alta velocidad con estilo y confort excepcional.",
    capacity: 8,
    price: "$6,200",
    priceNumber: 6200,
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800&h=600&fit=crop"
    ],
    features: ["Alta velocidad", "Deportes acuáticos", "Sonido premium", "Aire acondicionado", "Capitán profesional"],
    length: "82 pies",
    type: "Sport Yacht"
  },
  3:   {
    id: 3,
    name: "Princess V78",
    description: "Lujo británico con espacios amplios y confort excepcional. La combinación perfecta de elegancia y funcionalidad.",
    capacity: 10,
    price: "$7,800",
    priceNumber: 7800,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800&h=600&fit=crop"
    ],
    features: ["Cabinas VIP", "Flybridge", "Comedor exterior", "Plataforma de baño", "Capitán profesional"],
    length: "78 pies",
    type: "Flybridge"
  },
  4: {
    id: 4,
    name: "Ferretti 920",
    description: "La perfecta combinación de estilo italiano y rendimiento. Experiencia de navegación de lujo incomparable.",
    capacity: 14,
    price: "$12,000",
    priceNumber: 12000,
    image: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800&h=600&fit=crop",
    features: ["Suite master", "Gimnasio", "Spa", "Helipuerto", "Capitán profesional", "Tripulación completa"],
    length: "92 pies",
    type: "Super Yacht"
  },
  5: {
    id: 5,
    name: "Pershing 82",
    description: "Deportivo y elegante, perfecto para aventuras de alta velocidad con el máximo confort y estilo.",
    capacity: 10,
    price: "$9,500",
    priceNumber: 9500,
    image: "https://images.unsplash.com/photo-1551843073-4a9a5b6fcd5b?w=800&h=600&fit=crop",
    features: ["Deportes acuáticos", "Bar premium", "Cabina master", "Sistema de navegación", "Capitán profesional"],
    length: "82 pies",
    type: "Sport Yacht"
  },
  6: {
    id: 6,
    name: "Riva Aquarama",
    description: "Clásico italiano con elegancia atemporal. Una experiencia de navegación única con diseño legendario.",
    capacity: 6,
    price: "$4,500",
    priceNumber: 4500,
    image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800&h=600&fit=crop",
    features: ["Diseño clásico", "Maderas premium", "Motor twin", "Asientos de cuero", "Capitán profesional"],
    length: "27 pies",
    type: "Classic Yacht"
  },
  7: {
    id: 7,
    name: "Benetti Oasis",
    description: "Mega yacht con todas las comodidades de un resort flotante. La experiencia definitiva en navegación de lujo.",
    capacity: 20,
    price: "$25,000",
    priceNumber: 25000,
    image: "https://images.unsplash.com/photo-1564225045536-9b61d4c4dd90?w=800&h=600&fit=crop",
    features: ["Piscina infinity", "Helipad", "Cinema", "Spa completo", "Capitán profesional", "Tripulación completa"],
    length: "140 pies",
    type: "Super Yacht"
  },
  8: {
    id: 8,
    name: "Sea Ray Sundancer",
    description: "Perfecto para días familiares con comodidad y estilo. La opción ideal para experiencias inolvidables.",
    capacity: 8,
    price: "$3,800",
    priceNumber: 3800,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    features: ["Familiar", "Comfortable", "Fácil navegación", "Capitán profesional", "Equipo de seguridad"],
    length: "35 pies",
    type: "Sport Yacht"
  }
};

const YachtDetailsPage = () => {
  const params = useParams();
  const yachtId = params?.id ? Number(params.id) : null;
  
  if (!yachtId) {
    return (
      <div className="yacht-details-page">
        <div className="yacht-details-container">
          <h1>Yate no encontrado</h1>
          <p>El yate que buscas no existe.</p>
        </div>
      </div>
    );
  }
  
  const yacht = yachtData[yachtId as keyof typeof yachtData];

  if (!yacht) {
    return (
      <div className="yacht-details-page">
        <div className="yacht-details-container">
          <h1>Yate no encontrado</h1>
          <p>El yate que buscas no existe.</p>
        </div>
      </div>
    );
  }

  return <YachtDetails yacht={yacht} />;
};

export default YachtDetailsPage; 