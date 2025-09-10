'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "../menu/Menu";
import Loading from "../loading/Loading";
import "./Clubs.css";
import APIs from "@/services/APIS";
import useStore from "@/zustand/useStore";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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

interface Filters {
  type: string;
  typeId: number; // Agregamos el ID de la categoría
  priceRange: string;
  capacity: string;
}





const Clubs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Filters>({
    type: "",
    typeId: 0, // Por defecto "Todos" con ID 0
    priceRange: "",
    capacity: ""
  });

  const [filteredClubs, setFilteredClubs] = useState<Club[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loadingClubs, setLoadingClubs] = useState(false);

  const [totalClubs, setTotalClubs] = useState<number>(0);
  const [serverTotalPages, setServerTotalPages] = useState<number>(0);

  const fetchAllClubs = async () => {
    try {
      setLoadingClubs(true);
      const response = await APIs.getClubAll();
      console.log('All clubs:', response);
      
      if (response && response.data) {
        console.log('Clubs data received:', response.data);
        console.log('First club images:', response.data[0]?.images);
        setClubs(response.data);
        setTotalClubs(response.data.length);
        setServerTotalPages(1);
      } else {
        setClubs([]);
        setTotalClubs(0);
      }
    } catch (error) {
      console.error('Error fetching all clubs:', error);
      setClubs([]);
      setTotalClubs(0);
    } finally {
      setLoadingClubs(false);
    }
  }

  useEffect(() => {
    fetchAllClubs();
  }, []);



  // Filter and search logic - búsqueda local en los clubs cargados
  useEffect(() => {
    console.log('Filtering clubs:', clubs.length, 'clubs available');
    let filtered = clubs;

    // Search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(club =>
        club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (club.type?.name.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
        club.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.locality?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.municipality?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredClubs(filtered);
  }, [clubs, searchTerm]);

  // Pagination logic - usando total del servidor
  const currentClubs = filteredClubs; // Usar los clubs filtrados

  const handleFilterChange = (filterType: keyof Filters, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleCategoryChange = (categoryId: number, categoryName: string) => {
    // No hacer nada ya que no usamos categorías
  };

  const clearFilters = () => {
    setFilters({
      type: "",
      typeId: 0,
      priceRange: "",
      capacity: ""
    });
    setSearchTerm("");
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    // No necesitamos paginación ya que cargamos todos los clubs
  };

              console.log('Rendering Clubs component:', {
              clubsCount: clubs.length,
              filteredCount: filteredClubs.length,
              currentCount: currentClubs.length,
              loadingClubs,
              filters,
              firstClub: clubs[0]
            });

  return (
    <div className="clubs-page">
      {/* Header Navigation */}
      <header className="clubs-header">
        <div className="clubs-header-container">
          <Link href="/" className="clubs-header-btn clubs-back-btn">
            <span className="material-icons-round">arrow_back</span>
            Volver al Inicio
          </Link>

          <Link href="/consult-reservation" className="clubs-reserve-btn">
            Consultar Reserva
          </Link>
        </div>
      </header>

      {/* Search Row */}
      <div className="clubs-search-row">
        <div className="clubs-search-container">
          <div className="clubs-search-input-wrapper">
            <span className="material-icons-round clubs-search-icon">search</span>
            <input
              type="text"
              placeholder="Buscar clubs por nombre, tipo o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="clubs-search-input"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="clubs-clear-search"
              >
                <span className="material-icons-round">close</span>
              </button>
            )}
          </div>
          
          {/* Mobile Filter Button */}
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`clubs-mobile-filter-toggle ${showFilters ? 'active' : ''}`}>
            <span className="material-icons-round">tune</span>
          </button>
        </div>
      </div>

      {/* Desktop Filters - Always Visible */}
      <div className="clubs-desktop-filters">
        <div className="clubs-filters-container">
          <div className="clubs-filter-group">
            <label>Rango de Precio</label>
            <select 
              value={filters.priceRange} 
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            >
              <option value="">Todos los precios</option>
              <option value="0-5000">$0 - $5,000</option>
              <option value="5000-10000">$5,000 - $10,000</option>
              <option value="10000-15000">$10,000 - $15,000</option>
              <option value="15000+">$15,000+</option>
            </select>
          </div>

          <div className="clubs-filter-group">
            <label>Capacidad</label>
            <select 
              value={filters.capacity} 
              onChange={(e) => handleFilterChange('capacity', e.target.value)}
            >
              <option value="">Todas las capacidades</option>
              <option value="1-6">1-6 personas</option>
              <option value="7-12">7-12 personas</option>
              <option value="13-20">13-20 personas</option>
              <option value="20+">20+ personas</option>
            </select>
          </div>

          <button onClick={clearFilters} className="clubs-clear-filters">
            <span className="material-icons-round">clear</span>
            Limpiar Filtros
          </button>
        </div>
      </div>



      <section className="clubs-content">
        <div className="clubs-container">
          {/* Filter Options */}
          {showFilters && (
            <div className="clubs-filters-panel">
              <div className="clubs-filter-group">
                <label>Rango de Precio</label>
                <select 
                  value={filters.priceRange} 
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                >
                  <option value="">Todos los precios</option>
                  <option value="low">Menos de $6,000</option>
                  <option value="medium">$6,000 - $10,000</option>
                  <option value="high">Más de $10,000</option>
                </select>
              </div>

              <div className="clubs-filter-group">
                <label>Capacidad</label>
                <select 
                  value={filters.capacity} 
                  onChange={(e) => handleFilterChange('capacity', e.target.value)}
                >
                  <option value="">Todas las capacidades</option>
                  <option value="small">Hasta 8 personas</option>
                  <option value="medium">9-12 personas</option>
                  <option value="large">Más de 12 personas</option>
                </select>
              </div>

              <button onClick={clearFilters} className="clubs-clear-filters">
                <span className="material-icons-round">clear_all</span>
                Limpiar Filtros
              </button>
            </div>
          )}

          {/* Results Counter */}
          <div className="clubs-results-info">
            <p>Mostrando {currentClubs.length} de {filteredClubs.length} clubs {searchTerm && `(filtrados por "${searchTerm}")`}</p>
          </div>

          {/* Clubs Grid */}
          {loadingClubs ? (
            <div className="clubs-loading-container">
              <Loading 
                size="large" 
                text="Cargando clubs..." 
                className="clubs-loading"
              />
            </div>
          ) : (
            <div className="clubs-grid">
              {currentClubs.map((club) => (
                <div key={club.id} className="clubs-card">
                  <div className="clubs-image">
                    {club.images && club.images.length > 0 ? (
                      <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={0}
                        slidesPerView={1}
                        navigation={true}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        loop={true}
                        className="clubs-swiper"
                      >
                        {club.images.map((image, index) => (
                          <SwiperSlide key={index}>
                            <img 
                              src={image.url} 
                              alt={`${club.name} - Imagen ${index + 1}`} 
                              onError={(e) => {
                                console.log('Error loading club image:', image.url);
                                e.currentTarget.src = '/party.jpg';
                              }}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    ) : (
                      <img src="/party.jpg" alt={club.name} />
                    )}
                    <div className="clubs-location">{club.type?.name || 'Club'}</div>
                  </div>
                  
                  <div className="clubs-info">
                    <h3 className="clubs-name">{club.name}</h3>
                    <div className="clubs-specs">
                      <span className="clubs-spec">
                        <span className="material-icons-round">place</span>
                        {club.address}
                      </span>
                      <span className="clubs-spec">
                        <span className="material-icons-round">location_city</span>
                        {club.locality?.name}, {club.municipality?.name}
                      </span>
                    </div>
                    
                    <div className="clubs-characteristics">
                      {(() => {
                        const characteristics = Array.isArray(club.characteristics) ? club.characteristics : [];
                        
                        return (
                          <>
                            {characteristics.slice(0, 3).map((characteristic, index) => (
                              <span key={index} className="clubs-characteristic-tag">
                                {characteristic}
                              </span>
                            ))}
                            {characteristics.length > 3 && (
                              <span className="clubs-characteristic-more">
                                +{characteristics.length - 3} más
                              </span>
                            )}
                            {characteristics.length === 0 && (
                              <span className="clubs-characteristic-tag">
                                Ambiente exclusivo
                              </span>
                            )}
                          </>
                        );
                      })()}
                    </div>
                    
                    <div className="clubs-footer">
                      <div className="clubs-actions">
                        <Link href="/clubs/club" className="clubs-action-btn clubs-view-btn">
                          <span className="material-icons-round">visibility</span>
                          Ver
                        </Link>
                        <Link href={`/reservation?type=club&id=${club.id}`} className="clubs-action-btn clubs-reserve-btn">
                          <span className="material-icons-round">calendar_month</span>
                          Reservar
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results Message */}
          {!loadingClubs && filteredClubs.length === 0 && (
            <div className="clubs-no-results">
              <div className="clubs-no-results-icon">
                <span className="material-icons-round">nightlife</span>
              </div>
              <h3>No hay clubs disponibles</h3>
              <p>En este momento no tenemos clubs que coincidan con tu búsqueda. Prueba con otros filtros o vuelve más tarde.</p>
              <div className="clubs-no-results-actions">
                <button onClick={clearFilters} className="clubs-no-results-btn clubs-no-results-btn--primary">
                  <span className="material-icons-round">refresh</span>
                  Limpiar Filtros
                </button>
                <button onClick={clearFilters} className="clubs-no-results-btn clubs-no-results-btn--outline">
                  <span className="material-icons-round">home</span>
                  Ver Todos
                </button>
              </div>
            </div>
          )}


        </div>
      </section>
      
      {/* Mobile Menu */}
      {/* <Menu /> */}
    </div>
  );
};

export default Clubs;
