'use client'


import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "../menu/Menu";
import "./Yachts.css";

interface Yacht {
  id: number;
  name: string;
  description: string;
  capacity: number;
  price: string;
  priceNumber: number;
  image: string;
  features: string[];
  length: string;
  type: string;
}

interface Filters {
  type: string;
  priceRange: string;
  capacity: string;
}

// Extended yacht data for demonstration
const allYachts: Yacht[] = [
  {
    id: 1,
    name: "Azimut Grande",
    description: "Yacht de lujo con diseño italiano y tecnología de vanguardia",
    capacity: 12,
    price: "$8,500",
    priceNumber: 8500,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
    features: ["Chef privado", "Jacuzzi", "Bar completo", "Equipo de snorkel"],
    length: "95 pies",
    type: "Motor Yacht"
  },
  {
    id: 2,
    name: "Sunseeker Predator",
    description: "Velocidad y elegancia en perfecta armonía",
    capacity: 8,
    price: "$6,200",
    priceNumber: 6200,
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=600&fit=crop",
    features: ["Alta velocidad", "Deportes acuáticos", "Sonido premium", "Aire acondicionado"],
    length: "82 pies",
    type: "Sport Yacht"
  },
  {
    id: 3,
    name: "Princess V78",
    description: "Lujo británico con espacios amplios y confort excepcional",
    capacity: 10,
    price: "$7,800",
    priceNumber: 7800,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    features: ["Cabinas VIP", "Flybridge", "Comedor exterior", "Plataforma de baño"],
    length: "78 pies",
    type: "Flybridge"
  },
  {
    id: 4,
    name: "Ferretti 920",
    description: "La perfecta combinación de estilo italiano y rendimiento",
    capacity: 14,
    price: "$12,000",
    priceNumber: 12000,
    image: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800&h=600&fit=crop",
    features: ["Suite master", "Gimnasio", "Spa", "Helipuerto"],
    length: "92 pies",
    type: "Super Yacht"
  },
  {
    id: 5,
    name: "Pershing 82",
    description: "Deportivo y elegante, perfecto para aventuras de alta velocidad",
    capacity: 10,
    price: "$9,500",
    priceNumber: 9500,
    image: "https://images.unsplash.com/photo-1551843073-4a9a5b6fcd5b?w=800&h=600&fit=crop",
    features: ["Deportes acuáticos", "Bar premium", "Cabina master", "Sistema de navegación"],
    length: "82 pies",
    type: "Sport Yacht"
  },
  {
    id: 6,
    name: "Riva Aquarama",
    description: "Clásico italiano con elegancia atemporal",
    capacity: 6,
    price: "$4,500",
    priceNumber: 4500,
    image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800&h=600&fit=crop",
    features: ["Diseño clásico", "Maderas premium", "Motor twin", "Asientos de cuero"],
    length: "27 pies",
    type: "Classic Yacht"
  },
  {
    id: 7,
    name: "Benetti Oasis",
    description: "Mega yacht con todas las comodidades de un resort",
    capacity: 20,
    price: "$25,000",
    priceNumber: 25000,
    image: "https://images.unsplash.com/photo-1564225045536-9b61d4c4dd90?w=800&h=600&fit=crop",
    features: ["Piscina infinity", "Helipad", "Cinema", "Spa completo"],
    length: "140 pies",
    type: "Super Yacht"
  },
  {
    id: 8,
    name: "Sea Ray Sundancer",
    description: "Perfecto para días familiares con comodidad y estilo",
    capacity: 8,
    price: "$3,800",
    priceNumber: 3800,
    image: "https://images.unsplash.com/photo-1574854719037-5b82b1b29c0a?w=800&h=600&fit=crop",
    features: ["Cabina familiar", "Cocina completa", "Plataforma de baño", "Toldo retráctil"],
    length: "45 pies",
    type: "Flybridge"
  }
];

const ITEMS_PER_PAGE = 4;

const Yates: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Filters>({
    type: "",
    priceRange: "",
    capacity: ""
  });
  const [filteredYachts, setFilteredYachts] = useState<Yacht[]>(allYachts);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Filter and search logic
  useEffect(() => {
    let filtered = allYachts;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(yacht =>
        yacht.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        yacht.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        yacht.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (filters.type) {
      filtered = filtered.filter(yacht => yacht.type === filters.type);
    }

    // Price range filter
    if (filters.priceRange) {
      switch (filters.priceRange) {
        case "low":
          filtered = filtered.filter(yacht => yacht.priceNumber < 6000);
          break;
        case "medium":
          filtered = filtered.filter(yacht => yacht.priceNumber >= 6000 && yacht.priceNumber < 10000);
          break;
        case "high":
          filtered = filtered.filter(yacht => yacht.priceNumber >= 10000);
          break;
      }
    }

    // Capacity filter
    if (filters.capacity) {
      switch (filters.capacity) {
        case "small":
          filtered = filtered.filter(yacht => yacht.capacity <= 8);
          break;
        case "medium":
          filtered = filtered.filter(yacht => yacht.capacity > 8 && yacht.capacity <= 12);
          break;
        case "large":
          filtered = filtered.filter(yacht => yacht.capacity > 12);
          break;
      }
    }

    setFilteredYachts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, filters]);

  // Pagination logic
  const totalPages = Math.ceil(filteredYachts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentYachts = filteredYachts.slice(startIndex, endIndex);

  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      type: "",
      priceRange: "",
      capacity: ""
    });
    setSearchTerm("");
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

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
          <button 
            className={`yacht-type-btn ${filters.type === "" ? 'active' : ''}`}
            onClick={() => handleFilterChange('type', '')}
          >
            Todos
          </button>
          <button 
            className={`yacht-type-btn ${filters.type === "Motor Yacht" ? 'active' : ''}`}
            onClick={() => handleFilterChange('type', 'Motor Yacht')}
          >
            LUXURY
          </button>
          <button 
            className={`yacht-type-btn ${filters.type === "Sport Yacht" ? 'active' : ''}`}
            onClick={() => handleFilterChange('type', 'Sport Yacht')}
          >
            SPORT
          </button>
          <button 
            className={`yacht-type-btn ${filters.type === "Flybridge" ? 'active' : ''}`}
            onClick={() => handleFilterChange('type', 'Flybridge')}
          >
            FLYBRIDGE
          </button>
          <button 
            className={`yacht-type-btn ${filters.type === "Super Yacht" ? 'active' : ''}`}
            onClick={() => handleFilterChange('type', 'Super Yacht')}
          >
            GRANDES
          </button>
          <button 
            className={`yacht-type-btn ${filters.type === "Classic Yacht" ? 'active' : ''}`}
            onClick={() => handleFilterChange('type', 'Classic Yacht')}
          >
            CLÁSICOS
          </button>
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
            <p>Mostrando {currentYachts.length} de {filteredYachts.length} yates</p>
          </div>

          {/* Yachts Grid */}
          <div className="yates-grid">
            {currentYachts.map((yacht) => (
              <div key={yacht.id} className="yacht-card">
                <div className="yacht-image">
                  <img src={yacht.image} alt={yacht.name} />
                  <div className="yacht-location">{yacht.type}</div>
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
                      Puerto Banús
                    </span>
                  </div>
                  
                  <p className="yacht-description">{yacht.description}</p>
                  
                  <div className="yacht-characteristics">
                    {yacht.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="characteristic-tag">
                        {feature}
                      </span>
                    ))}
                    {yacht.features.length > 3 && (
                      <span className="characteristic-more">
                        +{yacht.features.length - 3} más
                      </span>
                    )}
                  </div>
                  
                  <div className="yacht-footer">
                    <span className="yacht-price">
                      {yacht.price}
                      <span className="yacht-currency"> MXN/día</span>
                    </span>
                    <div className="yacht-actions">
                      <Link href={`/yachts/${yacht.id}`} className="yacht-action-btn yacht-view-btn">
                        <span className="material-icons-round">visibility</span>
                        Ver
                      </Link>
                      <button className="yacht-action-btn yacht-message-btn">
                        <span className="material-icons-round">chat</span>
                        Mensaje
                      </button>
                      <Link href="/reservation" className="yacht-action-btn yacht-reserve-btn">
                        <span className="material-icons-round">calendar_month</span>
                        Reservar
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredYachts.length === 0 && (
            <div className="no-results">
              <span className="material-icons-round">search_off</span>
              <h3>No se encontraron yates</h3>
              <p>Intenta ajustar tus filtros de búsqueda</p>
              <button onClick={clearFilters} className="btn btn-primary">
                Limpiar Filtros
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                <span className="material-icons-round">chevron_left</span>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
                disabled={currentPage === totalPages}
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
