'use client'

import React, { useState } from "react";
import "./styles/FAQ.css";

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "¿Puedo cancelar si ya no viajaré?",
      answer: "Sí, puedes cancelar con anticipación.\n• 5 días o más antes: reembolso del 100%.\n• 4 días antes: reembolso del 90%.\n• 3 días o menos: se reembolsa solo el 20%.\nEn casos graves o excepcionales, contáctanos directamente y analizamos tu caso.",
    },
    {
      question: "¿Qué incluye mi renta de yate?",
      answer: "Nuestros yates están equipados con todo para que vivas la mejor experiencia:\n• Capitán profesional y tripulación capacitada.\n• Servicio a bordo: preparación de bebidas y cocteles.\n• 3 bolsas de hielo.\n• Hielera grande para tus botellas.\n• 3 bolsas grandes de sabritas (tú eliges).\n• 1 botella de cortesía (elige entre nuestras 3 opciones).\n• 24 cervezas + 24 botellas de agua.\n• Equipo de snorkel.",
    },
    {
      question: "¿Qué métodos de pago aceptan?",
      answer: "• Transferencia bancaria.\n• Efectivo (en pesos mexicanos o dólares).\nPregúntanos por otras opciones si las necesitas.",
    },
    {
      question: "¿Qué incluye mi pago?",
      answer: "Tu pago cubre todo lo necesario:\n• El servicio completo de la experiencia o tour.\n• Impuestos obligatorios como el Dock Fee (uso de marina), ZOFEMAT (zona federal marítima terrestre), entre otros.\nNota: Las propinas no están incluidas, pero siempre son bien recibidas por la tripulación.",
    },
    {
      question: "¿Con cuánta anticipación puedo reservar?",
      answer: "Puedes reservar hasta con 1 día de anticipación, sujeto a disponibilidad.\nSi buscas algo muy específico o quieres asegurar mejor atención, te recomendamos reservar con tiempo. ¡Estamos para ayudarte!",
    },
    {
      question: "¿Tienen servicio de transporte?",
      answer: "¡Sí! Contamos con servicio de transporte privado opcional para que no tengas que preocuparte por nada.\nSolo dinos tu ubicación y te cotizamos el traslado.",
    },
    {
      question: "¿Qué pasa si el clima no permite salir al mar?",
      answer: "Tu seguridad es primero.\nEn caso de mal clima o cierre de puerto, te ofrecemos reagendar sin costo adicional o, si lo prefieres, reembolso total.\n¡No te preocupes, siempre buscamos una solución justa!",
    },
    {
      question: "¿Cuántas personas pueden subir al yate?",
      answer: "Depende del yate que elijas.\nTenemos opciones desde 8 hasta más de 25 personas.\nConsúltanos y te damos el yate ideal según el número de personas y lo que buscas.",
    },
    {
      question: "¿Puedo llevar mis propias bebidas o comida?",
      answer: "Sí, puedes llevar lo que gustes.\nNuestros yates tienen hielera y espacio para que lo disfrutes como quieras.\nSolo ten en cuenta que no se permite vidrio en algunos casos por seguridad.",
    },
    {
      question: "¿Tienen opciones para celebraciones especiales?",
      answer: "¡Claro que sí!\nPodemos armar paquetes personalizados para:\n• Cumpleaños\n• Despedidas de solter@\n• Propuestas de matrimonio\n• Eventos privados\nIncluye decoración, música, fotógrafo y más. ¡Solo dinos tu idea y lo hacemos posible!",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq">
      <div className="faq-container">
        <div className="faq-header">
          <h2 className="faq-title">❓ Preguntas Frecuentes</h2>
          <p className="faq-description">
            Aquí encontrarás las siguientes preguntas frecuentes con sus respectivas respuestas
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
                <p style={{ whiteSpace: 'pre-line' }}>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
