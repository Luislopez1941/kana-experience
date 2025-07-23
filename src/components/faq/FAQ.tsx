'use client'

import React, { useState } from "react";
import "./styles/FAQ.css";

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "¿Qué incluye el alquiler del yate?",
      answer:
        "Incluye el yate completamente equipado, tripulación profesional, combustible para navegación local, equipo de snorkel, toallas, y bebidas no alcohólicas. Los alimentos y bebidas alcohólicas pueden agregarse según el paquete elegido.",
    },
    {
      question: "¿Necesito experiencia en navegación?",
      answer:
        "No, absolutamente no. Todos nuestros yates incluyen capitán y tripulación certificados. Tu única responsabilidad es relajarte y disfrutar la experiencia.",
    },
    {
      question: "¿Qué pasa si el clima no acompaña?",
      answer:
        "Monitoreamos constantemente las condiciones climáticas. Si las condiciones no son seguras, reprogramamos sin costo adicional o ofrecemos reembolso completo.",
    },
    {
      question: "¿Puedo personalizar mi experiencia?",
      answer:
        "¡Por supuesto! Ofrecemos experiencias completamente personalizables. Desde menús especiales hasta actividades específicas, trabajamos contigo para crear la experiencia perfecta.",
    },
    {
      question: "¿Qué documentos necesito?",
      answer:
        "Solo necesitas identificación oficial vigente. Para huéspedes internacionales, pasaporte vigente. Nosotros nos encargamos de todos los permisos de navegación.",
    },
    {
      question: "¿Cuál es la política de cancelación?",
      answer:
        "Ofrecemos cancelación gratuita hasta 48 horas antes del viaje. Para cancelaciones de último momento por emergencias, evaluamos cada caso individualmente.",
    },
    {
      question: "¿Puedo traer mi propia comida y bebidas?",
      answer:
        "Sí, puedes traer tu propia comida y bebidas. También ofrecemos servicios de catering gourmet y chef privado si prefieres una experiencia culinaria completa.",
    },
    {
      question: "¿Hay restricciones de edad?",
      answer:
        "No hay restricciones de edad. Tenemos experiencias diseñadas para todas las edades, desde bebés hasta adultos mayores. Contamos con equipos de seguridad para niños.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq">
      <div className="faq-container">
        <div className="faq-header">
          <h2 className="faq-title">Preguntas Frecuentes</h2>
          <p className="faq-description">
            Todo lo que necesitas saber sobre nuestros servicios
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? "faq-open" : ""}`}
            >
              <button className="faq-question" onClick={() => toggleFAQ(index)}>
                <span className="material-icons-round faq-icon">
                  help_outline
                </span>
                <span className="faq-question-text">{faq.question}</span>
                <span className="material-icons-round faq-toggle">
                  {openIndex === index ? "expand_less" : "expand_more"}
                </span>
              </button>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
