import React from "react";
import "./styles/WhyChooseUs.css";

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="why-choose-us">
      <div className="why-container">
        <div className="why-header">
          <h2 className="why-title">¿Qué nos diferencia?</h2>
          <p className="why-description">
            ¿Por qué elegirnos?
          </p>
        </div>

        <div className="why-grid">
          <div className="why-feature">
            <div className="why-icon">
              <span className="material-icons-round">star</span>
            </div>
            <h3 className="why-feature-title">Experiencias 100% personalizadas</h3>
            <p className="why-feature-text">
              Diseñamos cada tour a tu medida, tú eliges cómo vivir Cancún.
            </p>
          </div>
          <div className="why-feature">
            <div className="why-icon">
              <span className="material-icons-round">verified</span>
            </div>
            <h3 className="why-feature-title">Acceso exclusivo</h3>
            <p className="why-feature-text">
              Yates de lujo, antros top y spots únicos que no encontrarás en cualquier lado.
            </p>
          </div>
          <div className="why-feature">
            <div className="why-icon">
              <span className="material-icons-round">support_agent</span>
            </div>
            <h3 className="why-feature-title">Atención al cliente real</h3>
            <p className="why-feature-text">
              Te acompañamos en todo momento, sin bots ni respuestas automáticas.
            </p>
          </div>
          <div className="why-feature">
            <div className="why-icon">
              <span className="material-icons-round">security</span>
            </div>
            <h3 className="why-feature-title">Clima complicado, cero preocupaciones</h3>
            <p className="why-feature-text">
              Si el clima no permite la experiencia, ajustamos la fecha o te reembolsamos sin rodeos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
