'use client'

import React, { useState } from "react";

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

export default function ConsultReservationPage() {
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
        return "text-green-500";
      case "pendiente":
        return "text-yellow-500";
      case "cancelada":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmada":
        return "Confirmada";
      case "pendiente":
        return "Pendiente";
      case "cancelada":
        return "Cancelada";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Consulta tu Reserva
          </h1>
          <p className="text-xl text-blue-100">
            Ingresa el folio de tu reserva para ver los detalles
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
          <div className="max-w-md mx-auto mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                value={folio}
                onChange={(e) => setFolio(e.target.value)}
                placeholder="Ingresa tu folio (ej: LY2024001)"
                className="flex-1 px-4 py-3 rounded-lg bg-white/20 text-white placeholder-blue-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                onClick={handleSearch}
                disabled={loading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-semibold transition-colors duration-200"
              >
                {loading ? "Buscando..." : "Buscar"}
              </button>
            </div>
            {error && (
              <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
            )}
          </div>

          {reservation && (
            <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6 border border-white/30">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Detalles de la Reserva
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-blue-200 font-medium">Folio:</span>
                      <span className="text-white ml-2 font-mono">
                        {reservation.folio}
                      </span>
                    </div>
                    <div>
                      <span className="text-blue-200 font-medium">Cliente:</span>
                      <span className="text-white ml-2">
                        {reservation.customerName}
                      </span>
                    </div>
                    <div>
                      <span className="text-blue-200 font-medium">Yate:</span>
                      <span className="text-white ml-2">
                        {reservation.yacht}
                      </span>
                    </div>
                    <div>
                      <span className="text-blue-200 font-medium">Estado:</span>
                      <span className={`ml-2 font-semibold ${getStatusColor(reservation.status)}`}>
                        {getStatusText(reservation.status)}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Información del Viaje
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-blue-200 font-medium">Destino:</span>
                      <span className="text-white ml-2">
                        {reservation.destination}
                      </span>
                    </div>
                    <div>
                      <span className="text-blue-200 font-medium">Fechas:</span>
                      <span className="text-white ml-2">
                        {new Date(reservation.startDate).toLocaleDateString("es-ES")} - {new Date(reservation.endDate).toLocaleDateString("es-ES")}
                      </span>
                    </div>
                    <div>
                      <span className="text-blue-200 font-medium">Huéspedes:</span>
                      <span className="text-white ml-2">
                        {reservation.guests} personas
                      </span>
                    </div>
                    <div>
                      <span className="text-blue-200 font-medium">Total:</span>
                      <span className="text-white ml-2 font-semibold">
                        {reservation.totalAmount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {reservation.services.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-white mb-3">
                    Servicios Incluidos
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {reservation.services.map((service, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-600/30 text-blue-100 rounded-full text-sm border border-blue-500/30"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors duration-200"
                >
                  Nueva Búsqueda
                </button>
              </div>
            </div>
          )}

          {!reservation && !loading && (
            <div className="text-center text-blue-200">
              <p className="text-lg">
                Ejemplos de folios para probar:
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {mockReservations.map((res) => (
                  <button
                    key={res.folio}
                    onClick={() => setFolio(res.folio)}
                    className="px-3 py-1 bg-blue-600/30 hover:bg-blue-600/50 text-blue-100 rounded-full text-sm border border-blue-500/30 transition-colors duration-200"
                  >
                    {res.folio}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}