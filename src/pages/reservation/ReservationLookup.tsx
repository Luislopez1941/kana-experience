import React, { useState } from "react";
import Link from "next/link";
import "./styles/ReservationLookup.css";

interface ReservationData {
  folio: string;
  customerName: string;
  yacht: string;
  startDate: string;
  endDate: string;
  guests: number;
  destination: string;
  status: "confirmada" | "pendiente" | "cancelada";
  totalAmount: string;
  services: string[];
}

export default function ReservationLookup() {
  const [folio, setFolio] = useState("");
  const [reservation, setReservation] = useState<ReservationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock data for demonstration
  const mockReservations: ReservationData[] = [
    {
      folio: "LY2024001",
      customerName: "Carlos Mendoza",
      yacht: "Serenidad del Caribe",
      startDate: "2024-12-25",
      endDate: "2024-12-27",
      guests: 8,
      destination: "Cancún - Isla Mujeres",
      status: "confirmada",
      totalAmount: "$380,000",
      services: ["Chef Privado", "Deportes Acuáticos", "Cena Romántica"],
    },
    {
      folio: "LY2024002",
      customerName: "Ana Rodríguez",
      yacht: "Perla de Cortés",
      startDate: "2024-12-30",
      endDate: "2025-01-02",
      guests: 6,
      destination: "Los Cabos",
      status: "pendiente",
      totalAmount: "$280,000",
      services: ["Spa a Bordo", "Fotografía Profesional"],
    },
    {
      folio: "LY2024003",
      customerName: "Roberto Silva",
      yacht: "Majestic Riviera",
      startDate: "2024-11-15",
      endDate: "2024-11-17",
      guests: 12,
      destination: "Puerto Vallarta",
      status: "cancelada",
      totalAmount: "$520,000",
      services: ["Evento Corporativo", "Catering Gourmet"],
    },
  ];

  const handleSearch = async () => {
    if (!folio.trim()) {
      setError("Por favor ingresa un folio válido");
      return;
    }

    setLoading(true);
    setError("");
    setReservation(null);

    // Simulate API call
    setTimeout(() => {
      const found = mockReservations.find(
        (res) => res.folio.toLowerCase() === folio.toLowerCase().trim()
      );

      if (found) {
        setReservation(found);
        setError("");
      } else {
        setError("No se encontró ninguna reserva con ese folio");
        setReservation(null);
      }

      setLoading(false);
    }, 1000);
  };

  const handleReset = () => {
    setFolio("");
    setReservation(null);
    setError("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmada":
        return "#10b981";
      case "pendiente":
        return "#f59e0b";
      case "cancelada":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmada":
        return "Confirmada";
      case "pendiente":
        return "Pendiente de Pago";
      case "cancelada":
        return "Cancelada";
      default:
        return status;
    }
  };

  return (
    <div className="reservation-lookup-page">
      {/* Header Navigation */}
      <nav className="lookup-nav">
        <div className="lookup-nav-container">
          <Link href="/" className="lookup-nav-brand">
            <span className="material-icons-round nav-icon">sailing</span>
            <span className="nav-logo">LuxeYacht</span>
          </Link>
          <Link href="/" className="lookup-nav-back">
            <span className="material-icons-round">arrow_back</span>
            Volver al Inicio
          </Link>
        </div>
      </nav>

      <div className="lookup-container">
        <div className="lookup-header">
          <h1 className="lookup-title">Consultar Mi Reserva</h1>
          <p className="lookup-subtitle">
            Ingresa tu folio para ver los detalles de tu reserva
          </p>
        </div>

        {!reservation ? (
          <div className="lookup-search">
            <div className="search-card">
              <div className="search-section">
                <label className="search-label">
                  Folio de Reserva:
                </label>
                <div className="search-input-group">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Ej: LY2024001"
                    value={folio}
                    onChange={(e) => setFolio(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  />
                  <button
                    className="search-button"
                    onClick={handleSearch}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="material-icons-round spinning">
                        refresh
                      </span>
                    ) : (
                      <>
                        <span className="material-icons-round">search</span>
                        Buscar
                      </>
                    )}
                  </button>
                </div>
                {error && <div className="search-error">{error}</div>}
              </div>
            </div>

            <div className="help-section">
              <h3 className="help-title">¿Dónde encuentro mi folio?</h3>
              <div className="help-grid">
                <div className="help-item">
                  <div className="help-icon">
                    <span className="material-icons-round">email</span>
                  </div>
                  <div className="help-content">
                    <h4>Email de Confirmación</h4>
                    <p>Revisa tu correo electrónico donde recibiste la confirmación de tu reserva</p>
                  </div>
                </div>
                <div className="help-item">
                  <div className="help-icon">
                    <span className="material-icons-round">receipt</span>
                  </div>
                  <div className="help-content">
                    <h4>Comprobante de Pago</h4>
                    <p>El folio aparece en tu comprobante o recibo de pago</p>
                  </div>
                </div>
                <div className="help-item">
                  <div className="help-icon">
                    <span className="material-icons-round">support_agent</span>
                  </div>
                  <div className="help-content">
                    <h4>Contacta a Soporte</h4>
                    <p>Llámanos al +52 998 123 4567 para obtener ayuda</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="demo-section">
              <h3 className="demo-title">Folios de Demostración</h3>
              <p className="demo-subtitle">Prueba con estos folios de ejemplo:</p>
              <div className="demo-folios">
                <button 
                  className="demo-folio"
                  onClick={() => setFolio("LY2024001")}
                >
                  LY2024001 <span className="demo-status confirmed">Confirmada</span>
                </button>
                <button 
                  className="demo-folio"
                  onClick={() => setFolio("LY2024002")}
                >
                  LY2024002 <span className="demo-status pending">Pendiente</span>
                </button>
                <button 
                  className="demo-folio"
                  onClick={() => setFolio("LY2024003")}
                >
                  LY2024003 <span className="demo-status cancelled">Cancelada</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="reservation-result">
            <div className="result-header">
              <div className="result-actions">
                <button className="reset-button" onClick={handleReset}>
                  <span className="material-icons-round">arrow_back</span>
                  Nueva Búsqueda
                </button>
              </div>
            </div>

            <div className="reservation-card">
              <div className="reservation-header">
                <div className="reservation-folio">
                  <span className="folio-label">Folio:</span>
                  <span className="folio-number">{reservation.folio}</span>
                </div>
                <div
                  className="reservation-status"
                  style={{ backgroundColor: getStatusColor(reservation.status) }}
                >
                  {getStatusText(reservation.status)}
                </div>
              </div>

              <div className="reservation-grid">
                <div className="info-section">
                  <h3>
                    <span className="material-icons-round">person</span>
                    Información del Cliente
                  </h3>
                  <div className="info-item">
                    <strong>{reservation.customerName}</strong>
                  </div>
                </div>

                <div className="info-section">
                  <h3>
                    <span className="material-icons-round">sailing</span>
                    Detalles de la Reserva
                  </h3>
                  <div className="info-item">
                    <span className="info-label">Yate:</span>
                    <span>{reservation.yacht}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Destino:</span>
                    <span>{reservation.destination}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Huéspedes:</span>
                    <span>{reservation.guests} personas</span>
                  </div>
                </div>

                <div className="info-section">
                  <h3>
                    <span className="material-icons-round">event</span>
                    Fechas del Viaje
                  </h3>
                  <div className="info-item">
                    <span className="info-label">Inicio:</span>
                    <span>
                      {new Date(reservation.startDate).toLocaleDateString(
                        "es-MX",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Fin:</span>
                    <span>
                      {new Date(reservation.endDate).toLocaleDateString(
                        "es-MX",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </div>

                <div className="info-section services-section">
                  <h3>
                    <span className="material-icons-round">star</span>
                    Servicios Incluidos
                  </h3>
                  <div className="services-list">
                    {reservation.services.map((service, index) => (
                      <div key={index} className="service-item">
                        <span className="material-icons-round">check_circle</span>
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="total-section">
                <div className="total-amount">
                  <span className="total-label">Total:</span>
                  <span className="total-value">{reservation.totalAmount} MXN</span>
                </div>
              </div>

              <div className="action-buttons">
                <button className="action-btn secondary">
                  <span className="material-icons-round">print</span>
                  Imprimir Reserva
                </button>
                <button className="action-btn primary">
                  <span className="material-icons-round">download</span>
                  Descargar PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
