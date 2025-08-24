'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Traducciones
const translations = {
  es: {
    'header.home': 'Inicio',
    'header.fleet': 'Flota',
    'header.destinations': 'Destinos',
    'header.experiences': 'Experiencias',
    'header.checkReservation': 'Consultar Reserva',
    'header.language': 'Idioma',
  },
  en: {
    'header.home': 'Home',
    'header.fleet': 'Fleet',
    'header.destinations': 'Destinations',
    'header.experiences': 'Experiences',
    'header.checkReservation': 'Check Reservation',
    'header.language': 'Language',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
