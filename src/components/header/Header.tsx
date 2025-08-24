'use client'

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import "./styles/Header.css";

export const Header: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  const handleLanguageChange = (newLanguage: 'es' | 'en') => {
    if (newLanguage !== language) {
      toggleLanguage();
    }
    setLanguageDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <img src="/kana.png" alt="Kana Logo" className="header-logo-image" />
        </div>

        <nav className={`header-menu ${toggle ? 'header-menu-open' : ''}`}>
          <Link href="/" className="header-link">
            {t('header.home')}
          </Link>
          <Link href="#flota" className="header-link">
            {t('header.fleet')}
          </Link>
          <Link href="#destinos" className="header-link">
            {t('header.destinations')}
          </Link>
          <Link href="#experiencias" className="header-link">
            {t('header.experiences')}
          </Link>
        </nav>

        <div className="header-buttons">
          <div className="header-language-dropdown">
            <button 
              onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              className="header-language-btn"
              title={t('header.language')}
            >
              <span className="language-flag">
                {language === 'es' ? '🇪🇸' : '🇺🇸'}
              </span>
              <span className="language-text">
                {language === 'es' ? 'ES' : 'EN'}
              </span>
              <ChevronDown 
                className={`dropdown-arrow ${languageDropdownOpen ? 'open' : ''}`}
                size={16}
              />
            </button>
            
            {languageDropdownOpen && (
              <div className="language-dropdown-menu">
                <button 
                  onClick={() => handleLanguageChange('es')}
                  className={`language-option ${language === 'es' ? 'active' : ''}`}
                >
                  <span className="language-flag">🇪🇸</span>
                  <span>Español</span>
                </button>
                <button 
                  onClick={() => handleLanguageChange('en')}
                  className={`language-option ${language === 'en' ? 'active' : ''}`}
                >
                  <span className="language-flag">🇺🇸</span>
                  <span>English</span>
                </button>
              </div>
            )}
          </div>
          
          <Link href="/reservation" className="header-cta">
            {t('header.checkReservation')}
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
