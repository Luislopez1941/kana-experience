'use client'

import React, { useState } from "react";
import "./styles/Header.css";

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <span className="material-icons-round header-icon">sailing</span>
          <span className="header-logo">LuxeYacht</span>
        </div>

        <div className={`header-menu ${isMenuOpen ? "header-menu-open" : ""}`}>
          <a href="#flota" className="header-link">
            Flota
          </a>
          <a href="#destinos" className="header-link">
            Destinos
          </a>
          <a href="#experiencias" className="header-link">
            Experiencias
          </a>
          <a href="#nosotros" className="header-link">
            Nosotros
          </a>
          <a href="#contacto" className="header-link">
            Contacto
          </a>
        </div>

        <div className="header-buttons">
          <button className="btn btn-secondary header-cta">Consultar Reserva</button>
          <button className="btn btn-primary header-cta">Reservar Ahora</button>
        </div>

        <button
          className="header-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="material-icons-round">
            {isMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>
    </header>
  );
};
