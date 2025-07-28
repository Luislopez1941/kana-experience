'use client'

import React, { useState } from "react";
import Link from "next/link";
import "./styles/Header.css";

export const Header: React.FC = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <img src="/kana.png" alt="Kana Logo" className="header-logo-image" />
        </div>

        <nav className={`header-menu ${toggle ? 'header-menu-open' : ''}`}>
          <Link href="/" className="header-link">
            Inicio
          </Link>
          <Link href="#flota" className="header-link">
            Flota
          </Link>
          <Link href="#destinos" className="header-link">
            Destinos
          </Link>
          <Link href="#experiencias" className="header-link">
            Experiencias
          </Link>
        </nav>

        <div className="header-buttons">
          <Link href="/reservation" className="header-cta">
            Consultar Reserva
          </Link>
        </div>

        <div className='toggle' onClick={() => setToggle(!toggle)}>
          <button className={`toggle__botton ${toggle ? 'activo' : ''}`}>
            <span className="l1 span"></span>
            <span className="l2 span"></span>
            <span className="l3 span"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
