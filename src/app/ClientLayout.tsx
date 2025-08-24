'use client'

import React from 'react';
import { LanguageProvider } from "../contexts/LanguageContext";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  );
}
