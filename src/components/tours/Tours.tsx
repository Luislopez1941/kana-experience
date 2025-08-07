'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "../menu/Menu";
import Loading from "../loading/Loading";
import "./Tours.css";
import APIs from "@/services/APIS";
import useStore from "@/zustand/useStore";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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

interface Filters {
  type: string;
  typeId: number;
  priceRange: string;
  location: string;
}

interface TourCategory {
  id: number;
  name: string;
}

const ITEMS_PER_PAGE = 4;

const Tours: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Filters>({
    type: "",
    typeId: 0,
    priceRange: "",
    location: ""
  });
  const { url_server } = useStore();
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [tourCategories, setTourCategories] = useState<TourCategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [tours, setTours] = useState<Tour[]>([]);
  const [loadingTours, setLoadingTours] = useState(false);
  const [selectedPersons, setSelectedPersons] = useState<{ [tourId: number]: number }>({});
  const [totalTours, setTotalTours] = useState<number>(0);
  const [serverTotalPages, setServerTotalPages] = useState<number>(0);

  const fetch = async () => {
    try {
      setLoadingCategories(true);
      const response = await APIs.getTourCategories();
      console.log('Tour Categories:', response);
      
      if (response && response.data) {
        setTourCategories(response.data);
      }
    } catch (error) {
      console.error('Error fetching tour categories:', error);
    } finally {
      setLoadingCategories(false);
    }
  }

  const fetchToursByCategory = async (categoryId: number, page: number = 1) => {
    try {
      setLoadingTours(true);
      const response = await APIs.getTourByTourCategory(categoryId);
      console.log('Tours by category:', response);
      
      if (response && response.data) {
        setTours(response.data);
        setTotalTours(response.data.length);
        setServerTotalPages(1);
      } else {
        setTours([]);
        setTotalTours(0);
      }
    } catch (error) {
      console.error('Error fetching tours by category:', error);
      setTours([]);
      setTotalTours(0);
    } finally {
      setLoadingTours(false);
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  // Disparar petición cuando cambie la categoría seleccionada
  useEffect(() => {
    setCurrentPage(1);
    fetchToursByCategory(filters.typeId, 1);
  }, [filters.typeId]);

  // Actualizar las personas seleccionadas cuando cambien los tours
  useEffect(() => {
    if (tours.length > 0) {
      const newSelectedPersons: { [tourId: number]: number } = {};
      
      tours.forEach(tour => {
        if (tour.pricing && tour.pricing.length > 0) {
          if (!selectedPersons[tour.id]) {
            newSelectedPersons[tour.id] = tour.pricing[0].personas;
          } else {
            newSelectedPersons[tour.id] = selectedPersons[tour.id];
          }
        }
      });
      
      setSelectedPersons(prev => ({ ...prev, ...newSelectedPersons }));
    }
  }, [tours]);

  // Filter and search logic
  useEffect(() => {
    console.log('Filtering tours:', tours.length, 'tours available');
    let filtered = tours;

    // Search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(tour =>
        tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (tour.tourCategory?.name.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
        tour.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTours(filtered);
  }, [tours, searchTerm]);

  const currentTours = filteredTours;

  const handleFilterChange = (filterType: keyof Filters, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleCategoryChange = (categoryId: number, categoryName: string) => {
    setFilters(prev => ({
      ...prev,
      type: categoryName,
      typeId: categoryId
    }));
  };

  const clearFilters = () => {
    setFilters({
      type: "",
      typeId: 0,
      priceRange: "",
      location: ""
    });
    setSearchTerm("");
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    fetchToursByCategory(filters.typeId, page);
  };

  console.log('Rendering Tours component:', {
    toursCount: tours.length,
    filteredCount: filteredTours.length,
    currentCount: currentTours.length,
    loadingTours,
    filters
  });

  return (
    <div className="tours-page">
      {/* Header Navigation */}
      <header className="tours-header">
        <div className="tours-header-container">
          <Link href="/" className="btn btn-outline tours-header-btn tours-back-btn">
            <span className="material-icons-round">arrow_back</span>
            Volver al Inicio
          </Link>

          <Link href="/consult-reservation" className="btn btn-primary header-cta tours-reserve-btn">
            Consultar Reserva
          </Link>
        </div>
      </header>

      {/* Search Row */}
      <div className="tours-search-row">
        <div className="tours-search-container">
          <div className="search-input-wrapper">
            <span className="material-icons-round search-icon">search</span>
            <input
              type="text"
              placeholder="Buscar tours por nombre, tipo o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="clear-search"
              >
                <span className="material-icons-round">close</span>
              </button>
            )}
          </div>
          
          {/* Mobile Filter Button */}
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`mobile-filter-toggle ${showFilters ? 'active' : ''}`}
          >
            <span className="material-icons-round">tune</span>
          </button>
        </div>
      </div>

      {/* Desktop Filters - Always Visible */}
      <div className="tours-desktop-filters">
        <div className="tours-filters-container">
          <div className="filter-group">
            <label>Rango de Precio</label>
            <select 
              value={filters.priceRange} 
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            >
              <option value="">Todos los precios</option>
              <option value="0-1000">$0 - $1,000</option>
              <option value="1000-2000">$1,000 - $2,000</option>
              <option value="2000-3000">$2,000 - $3,000</option>
              <option value="3000+">$3,000+</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Ubicación</label>
            <select 
              value={filters.location} 
              onChange={(e) => handleFilterChange('location', e.target.value)}
            >
              <option value="">Todas las ubicaciones</option>
              <option value="cancun">Cancún</option>
              <option value="playa-del-carmen">Playa del Carmen</option>
              <option value="tulum">Tulum</option>
              <option value="isla-mujeres">Isla Mujeres</option>
            </select>
          </div>

          <button onClick={clearFilters} className="clear-filters">
            <span className="material-icons-round">clear</span>
            Limpiar Filtros
          </button>
        </div>
      </div>

      {/* Tour Types Submenu */}
      <div className="tours-types-menu">
        <div className="tours-types-container">
          {/* Botón "Todos" siempre presente */}
          <button 
            className={`tour-type-btn ${filters.typeId === 0 ? 'active' : ''}`}
            onClick={() => handleCategoryChange(0, '')}
          >
            Todos
          </button>
          
          {/* Categorías dinámicas de la API */}
          {loadingCategories ? (
            <div className="tour-categories-loading">
              <span className="material-icons-round">refresh</span>
              Cargando categorías...
            </div>
          ) : (
            // Categorías dinámicas
            tourCategories.map((category) => (
              <button 
                key={category.id}
                className={`tour-type-btn ${filters.typeId === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category.id, category.name)}
              >
                {category.name.toUpperCase()}
              </button>
            ))
          )}
        </div>
      </div>

      <section className="tours-content">
        <div className="container">
          {/* Filter Options */}
          {showFilters && (
            <div className="filters-panel">
              <div className="filter-group">
                <label>Rango de Precio</label>
                <select 
                  value={filters.priceRange} 
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                >
                  <option value="">Todos los precios</option>
                  <option value="low">Menos de $1,500</option>
                  <option value="medium">$1,500 - $2,500</option>
                  <option value="high">Más de $2,500</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Ubicación</label>
                <select 
                  value={filters.location} 
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                >
                  <option value="">Todas las ubicaciones</option>
                  <option value="cancun">Cancún</option>
                  <option value="playa-del-carmen">Playa del Carmen</option>
                  <option value="tulum">Tulum</option>
                  <option value="isla-mujeres">Isla Mujeres</option>
                </select>
              </div>

              <button onClick={clearFilters} className="clear-filters">
                <span className="material-icons-round">clear_all</span>
                Limpiar Filtros
              </button>
            </div>
          )}

          {/* Results Counter */}
          <div className="results-info">
            <p>Mostrando {currentTours.length} de {filteredTours.length} tours {searchTerm && `(filtrados por "${searchTerm}")`}</p>
          </div>

          {/* Tours Grid */}
          {loadingTours ? (
            <div className="tours-loading-container">
              <Loading 
                size="large" 
                text="Cargando tours..." 
                className="loading-tours"
              />
            </div>
          ) : (
            <div className="tours-grid">
              {currentTours.map((tour) => (
                <div key={tour.id} className="tour-card">
                  <div className="tour-image">
                    {tour.images && tour.images.length > 0 ? (
                      <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={0}
                        slidesPerView={1}
                        navigation={true}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        loop={true}
                        className="tour-swiper"
                      >
                        {tour.images.map((image, index) => (
                          <SwiperSlide key={index}>
                            <img 
                              src={`${url_server}${image.url}`} 
                              alt={`${tour.name} - Imagen ${index + 1}`} 
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    ) : (
                      <img src="/tour_01.jpg" alt={tour.name} />
                    )}
                    <div className="tour-location">{tour.tourCategory?.name || 'N/A'}</div>
                  </div>
                  
                  <div className="tour-info">
                    <h3 className="tour-name">{tour.name}</h3>
                    <div className="tour-specs">
                      <span className="tour-spec">
                        <span className="material-icons-round">schedule</span>
                        {tour.duracion || 'Duración no especificada'}
                      </span>
                      <span className="tour-spec">
                        <span className="material-icons-round">place</span>
                        {tour.location}
                      </span>
                      {tour.edadMinima && (
                        <span className="tour-spec">
                          <span className="material-icons-round">person</span>
                          {tour.edadMinima}
                        </span>
                      )}
                    </div>
                    
                    <div className="tour-characteristics">
                      {(() => {
                        const characteristics = Array.isArray(tour.characteristics) ? tour.characteristics : [];
                        
                        return (
                          <>
                            {characteristics.slice(0, 3).map((characteristic, index) => (
                              <span key={index} className="characteristic-tag">
                                {characteristic.name}
                              </span>
                            ))}
                            {characteristics.length > 3 && (
                              <span className="characteristic-more">
                                +{characteristics.length - 3} más
                              </span>
                            )}
                          </>
                        );
                      })()}
                    </div>
                    
                    <div className="tour-footer">
                      <div className="tour-pricing">
                        {tour.pricing && tour.pricing.length > 0 ? (
                          <div className="pricing-container">
                            <div className="pricing-options">
                              {tour.pricing.map((price, index) => (
                                <button
                                  key={index}
                                  className={`pricing-option ${selectedPersons[tour.id] === price.personas ? 'active' : ''}`}
                                  onClick={() => setSelectedPersons(prev => ({ ...prev, [tour.id]: price.personas }))}
                                >
                                  <span className="option-persons">{price.personas} personas</span>
                                </button>
                              ))}
                            </div>
                            <div className="selected-price">
                              <span className="price-amount">
                                ${tour.pricing.find(p => p.personas === selectedPersons[tour.id])?.precio.toLocaleString() || 'N/A'}
                              </span>
                              <span className="price-persons">/{selectedPersons[tour.id] || tour.pricing[0]?.personas || 0} personas</span>
                            </div>
                          </div>
                        ) : (
                          <span className="tour-price">
                            Consultar
                            <span className="tour-currency"> MXN</span>
                          </span>
                        )}
                      </div>
                      <div className="tour-actions">
                        <Link href="/tours/tour" className="tour-action-btn tour-view-btn">
                          <span className="material-icons-round">visibility</span>
                          Ver
                        </Link>
                        <Link href="/reservation" className="tour-action-btn tour-reserve-btn">
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
          {!loadingTours && filteredTours.length === 0 && (
            <div className="no-results">
              <div className="no-results-icon">
                <span className="material-icons-round">explore</span>
              </div>
              <h3>No hay tours disponibles</h3>
              <p>En este momento no tenemos tours que coincidan con tu búsqueda. Prueba con otros filtros o vuelve más tarde.</p>
              <div className="no-results-actions">
                <button onClick={clearFilters} className="btn btn-primary">
                  <span className="material-icons-round">refresh</span>
                  Limpiar Filtros
                </button>
                <button onClick={() => handleCategoryChange(0, '')} className="btn btn-outline">
                  <span className="material-icons-round">home</span>
                  Ver Todos
                </button>
              </div>
            </div>
          )}

          {/* Pagination */}
          {serverTotalPages > 0 && (
            <div className="pagination">
              <button 
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                <span className="material-icons-round">chevron_left</span>
              </button>

              {Array.from({ length: serverTotalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                >
                  {page}
                </button>
              ))}

              <button 
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === serverTotalPages}
                className="pagination-btn"
              >
                <span className="material-icons-round">chevron_right</span>
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Mobile Menu */}
      <Menu />
    </div>
  );
};

export default Tours;