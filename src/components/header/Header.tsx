'use client'

import React, { useState } from "react";
import Link from "next/link";
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
            Inicio
          </a>
          <a href="#destinos" className="header-link">
            Experiencias
          </a>
          <a href="#experiencias" className="header-link">
            Nosotros
          </a>
          <a href="#nosotros" className="header-link">
            Contacto
          </a>
        </div>

        <div className="header-buttons">
          <Link href="/reservation" className="btn btn-primary header-cta">
            Consultar Reserva
          </Link>
        </div>

        <div className='toggle' onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <button className={`toggle__botton ${isMenuOpen ? 'activo' : ''}`}>
            <span className="l1 span"></span>
            <span className="l2 span"></span>
            <span className="l3 span"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
