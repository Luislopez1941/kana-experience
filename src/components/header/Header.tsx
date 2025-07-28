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
          <img 
            src="/kana.png" 
            alt="LuxeYacht Logo" 
            className="header-logo-image"
          />
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
          <Link href="/consult-reservation" className="btn btn-primary header-cta">
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
