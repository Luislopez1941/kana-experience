'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "../menu/Menu";
import Loading from "../loading/Loading";
import "./Yachts.css";
import APIs from "@/services/APIS";
import useStore from "@/zustand/useStore";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Yacht {
  id: number;
  name: string;
  description: string;
  capacity: number;
  price?: string;
  priceNumber?: number;
  image?: string;
  features?: string[];
  length: string;
  type?: string;
  // Campos de la API real
  characteristics?: Array<{ id: number; name: string; yachtId: number; createdAt: string; updatedAt: string }>;
  images?: Array<{ url: string }>;
  pricing?: Array<{ hours: number; price: number }>;
  yachtCategory?: { id: number; name: string };
  yachtCategoryId: number;
  location: string;
  status: string;
}

interface Filters {
  type: string;
  typeId: number; // Agregamos el ID de la categoría
  priceRange: string;
  capacity: string;
}

interface YachtCategory {
  id: number;
  name: string;
  description?: string;
}



const ITEMS_PER_PAGE = 4;

const Yates: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Filters>({
    type: "",
    typeId: 0, // Por defecto "Todos" con ID 0
    priceRange: "",
    capacity: ""
  });
  const { url_server } = useStore();
  const [filteredYachts, setFilteredYachts] = useState<Yacht[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [yachtCategories, setYachtCategories] = useState<YachtCategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [yachts, setYachts] = useState<Yacht[]>([]);
  const [loadingYachts, setLoadingYachts] = useState(false);
  const [selectedHours, setSelectedHours] = useState<{ [yachtId: number]: number }>({}); // Horas seleccionadas por yacht
  const [totalYachts, setTotalYachts] = useState<number>(0);
  const [serverTotalPages, setServerTotalPages] = useState<number>(0);

  const fetch = async () => {
    try {
      setLoadingCategories(true);
      const response = await APIs.getYachtCategories(1);
      console.log('Yacht Categories:', response);
      
      if (response && response.data) {
        setYachtCategories(response.data);
      }
    } catch (error) {
      console.error('Error fetching yacht categories:', error);
    } finally {
      setLoadingCategories(false);
    }
  }

  const fetchYachtsByCategory = async (categoryId: number, page: number = 1) => {
    let data = {
      userId: 1,
      yachtCategoryId: categoryId,
      page: page,
    }
    try {
      setLoadingYachts(true);
      const response = await APIs.getYachtByYachtType(data);
      console.log('Yachts by category:', response);
      
      if (response && response.data) {
        setYachts(response.data);
        // Usar la información de paginación del servidor
        if (response.pagination) {
          setTotalYachts(response.pagination.total);
          setCurrentPage(response.pagination.page);
          setServerTotalPages(response.pagination.totalPages);
        } else {
          setTotalYachts(response.data.length);
          setServerTotalPages(1);
        }
      } else {
        setYachts([]);
        setTotalYachts(0);
      }
    } catch (error) {
      console.error('Error fetching yachts by category:', error);
      setYachts([]);
      setTotalYachts(0);
    } finally {
      setLoadingYachts(false);
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  // Disparar petición cuando cambie la categoría seleccionada
  useEffect(() => {
    setCurrentPage(1); // Reset a página 1 cuando cambie categoría
    fetchYachtsByCategory(filters.typeId, 1);
  }, [filters.typeId]);

  // Cargar yates iniciales
  useEffect(() => {
    fetchYachtsByCategory(0, 1); // Cargar "Todos" por defecto
  }, []);

  // Actualizar las horas seleccionadas cuando cambien los yates
  useEffect(() => {
    if (yachts.length > 0) {
      const newSelectedHours: { [yachtId: number]: number } = {};
      
      yachts.forEach(yacht => {
        if (yacht.pricing && yacht.pricing.length > 0) {
          // Si no hay hora seleccionada para este yacht, usar la primera disponible
          if (!selectedHours[yacht.id]) {
            newSelectedHours[yacht.id] = yacht.pricing[0].hours;
          } else {
            // Mantener la hora ya seleccionada
            newSelectedHours[yacht.id] = selectedHours[yacht.id];
          }
        }
      });
      
      setSelectedHours(prev => ({ ...prev, ...newSelectedHours }));
    }
  }, [yachts]);

  // Filter and search logic - búsqueda local en los yates cargados
  useEffect(() => {
    console.log('Filtering yachts:', yachts.length, 'yachts available');
    let filtered = yachts;

    // Search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(yacht =>
        yacht.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        yacht.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (yacht.yachtCategory?.name.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
        yacht.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredYachts(filtered);
  }, [yachts, searchTerm]);

  // Pagination logic - usando total del servidor
  const currentYachts = filteredYachts; // Usar los yates filtrados

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
      capacity: ""
    });
    setSearchTerm("");
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    fetchYachtsByCategory(filters.typeId, page);
  };

  console.log('Rendering Yachts component:', {
    yachtsCount: yachts.length,
    filteredCount: filteredYachts.length,
    currentCount: currentYachts.length,
    loadingYachts,
    filters
  });

  return (
    <div className="yates-page">
      {/* Header Navigation */}
      <header className="yates-header">
        <div className="yates-header-container">
          <Link href="/" className="btn btn-outline yates-header-btn yates-back-btn">
            <span className="material-icons-round">arrow_back</span>
            Volver al Inicio
          </Link>

          <Link href="/consult-reservation" className="btn btn-primary header-cta yates-reserve-btn">
            Consultar Reserva
          </Link>
        </div>
      </header>

      {/* Search Row */}
      <div className="yates-search-row">
        <div className="yates-search-container">
          <div className="search-input-wrapper">
            <span className="material-icons-round search-icon">search</span>
            <input
              type="text"
              placeholder="Buscar yates por nombre, tipo o descripción..."
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
      <div className="yates-desktop-filters">
        <div className="yates-filters-container">
          <div className="filter-group">
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

                     <div className="filter-group">
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



          <button onClick={clearFilters} className="clear-filters">
            <span className="material-icons-round">clear</span>
            Limpiar Filtros
          </button>
        </div>
      </div>



      {/* Yacht Types Submenu */}
      <div className="yates-types-menu">
        <div className="yates-types-container">
                     {/* Botón "Todos" siempre presente */}
           <button 
             className={`yacht-type-btn ${filters.typeId === 0 ? 'active' : ''}`}
             onClick={() => handleCategoryChange(0, '')}
           >
             Todos
           </button>
          
                     {/* Categorías dinámicas de la API */}
           {loadingCategories ? (
             <div className="yacht-categories-loading">
               <span className="material-icons-round">refresh</span>
               Cargando categorías...
             </div>
           ) : (
                         // Categorías dinámicas
             yachtCategories.map((category) => (
               <button 
                 key={category.id}
                 className={`yacht-type-btn ${filters.typeId === category.id ? 'active' : ''}`}
                 onClick={() => handleCategoryChange(category.id, category.name)}
               >
                 {category.name.toUpperCase()}
               </button>
             ))
          )}
        </div>
      </div>

              <section className="yates-content">
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
                  <option value="low">Menos de $6,000</option>
                  <option value="medium">$6,000 - $10,000</option>
                  <option value="high">Más de $10,000</option>
                </select>
              </div>

                             <div className="filter-group">
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



              <button onClick={clearFilters} className="clear-filters">
                <span className="material-icons-round">clear_all</span>
                Limpiar Filtros
              </button>
            </div>
          )}

                     {/* Results Counter */}
                       <div className="results-info">
              <p>Mostrando {currentYachts.length} de {filteredYachts.length} yates {searchTerm && `(filtrados por "${searchTerm}")`}</p>
            </div>

                     {/* Yachts Grid */}
           {loadingYachts ? (
             <div className="yachts-loading-container">
               <Loading 
                 size="large" 
                 text="Cargando yates..." 
                 className="loading-yachts"
               />
             </div>
           ) : (
             <div className="yates-grid">
               {currentYachts.map((yacht) => (
              <div key={yacht.id} className="yacht-card">
                                 <div className="yacht-image">
                  {yacht.images && yacht.images.length > 0 ? (
                    <Swiper
                      modules={[Navigation, Pagination, Autoplay]}
                      spaceBetween={0}
                      slidesPerView={1}
                      navigation={true}
                      pagination={{ clickable: true }}
                      autoplay={{ delay: 3000, disableOnInteraction: false }}
                      loop={true}
                      className="yacht-swiper"
                    >
                                             {yacht.images.map((image, index) => (
                         <SwiperSlide key={index}>
                           <img 
                             src={image.url} 
                             alt={`${yacht.name} - Imagen ${index + 1}`} 
                           />
                         </SwiperSlide>
                       ))}
                    </Swiper>
                  ) : (
                    <img src={yacht.image || '/yacht_01.jpg'} alt={yacht.name} />
                  )}
                  <div className="yacht-location">{yacht.yachtCategory?.name || yacht.type || 'N/A'}</div>
                </div>
                
                <div className="yacht-info">
                  <h3 className="yacht-name">{yacht.name}</h3>
                  <div className="yacht-specs">
                    <span className="yacht-spec">
                      <span className="material-icons-round">straighten</span>
                      {yacht.length}
                    </span>
                    <span className="yacht-spec">
                      <span className="material-icons-round">people</span>
                      {yacht.capacity} personas
                    </span>
                                         <span className="yacht-spec">
                       <span className="material-icons-round">place</span>
                       {yacht.location}
                     </span>
                  </div>
                  
                  
                  
                                     <div className="yacht-characteristics">
                     {(() => {
                       const characteristics = Array.isArray(yacht.characteristics) ? yacht.characteristics : [];
                       const features = Array.isArray(yacht.features) ? yacht.features : [];
                       
                       // Extract name property from characteristics objects
                       const characteristicNames = characteristics.map(char => char.name);
                       
                       const allFeatures = [...characteristicNames, ...features];
                       
                       return (
                         <>
                           {allFeatures.slice(0, 3).map((feature, index) => (
                             <span key={index} className="characteristic-tag">
                               {feature}
                             </span>
                           ))}
                           {allFeatures.length > 3 && (
                             <span className="characteristic-more">
                               +{allFeatures.length - 3} más
                             </span>
                           )}
                         </>
                       );
                     })()}
                   </div>
                  
                                     <div className="yacht-footer">
                     <div className="yacht-pricing">
                       {yacht.pricing && yacht.pricing.length > 0 ? (
                         <div className="pricing-container">
                           <div className="pricing-options">
                             {yacht.pricing.map((price, index) => (
                               <button
                                 key={index}
                                 className={`pricing-option ${selectedHours[yacht.id] === price.hours ? 'active' : ''}`}
                                 onClick={() => setSelectedHours(prev => ({ ...prev, [yacht.id]: price.hours }))}
                               >
                                 <span className="option-hours">{price.hours}h</span>
                               </button>
                             ))}
                           </div>
                           <div className="selected-price">
                             <span className="price-amount">
                               ${yacht.pricing.find(p => p.hours === selectedHours[yacht.id])?.price.toLocaleString() || 'N/A'}
                             </span>
                             <span className="price-duration">/{selectedHours[yacht.id] || yacht.pricing[0]?.hours || 0}h</span>
                           </div>
                         </div>
                       ) : (
                         <span className="yacht-price">
                           {yacht.price || 'Consultar'}
                           <span className="yacht-currency"> MXN</span>
                         </span>
                       )}
                     </div>
                                         <div className="yacht-actions">
                       <Link href="/yachts/yacht" className="yacht-action-btn yacht-view-btn">
                         <span className="material-icons-round">visibility</span>
                         Ver
                       </Link>
                      <Link href={`/reservation?type=yacht&id=${yacht.id}`} className="yacht-action-btn yacht-reserve-btn">
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
                       {!loadingYachts && filteredYachts.length === 0 && (
             <div className="no-results">
               <div className="no-results-icon">
                 <span className="material-icons-round">sailing</span>
               </div>
               <h3>No hay yates disponibles</h3>
               <p>En este momento no tenemos yates que coincidan con tu búsqueda. Prueba con otros filtros o vuelve más tarde.</p>
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

export default Yates;
