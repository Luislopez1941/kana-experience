import React from "react";
import "./styles/WhyChooseUs.css";

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="why-choose-us">
      <div className="why-container">
        <div className="why-header">
          <h2 className="why-title">¿Por qué elegir LuxeYacht?</h2>
          <p className="why-description">
            La diferencia está en los detalles
          </p>
        </div>

        <div className="why-grid">
          <div className="why-feature">
            <div className="why-icon">
              <span className="material-icons-round">star</span>
            </div>
            <h3 className="why-feature-title">Flota Premium</h3>
            <p className="why-feature-text">
              Los yates más nuevos y lujosos de México
            </p>
          </div>
          <div className="why-feature">
            <div className="why-icon">
              <span className="material-icons-round">verified</span>
            </div>
            <h3 className="why-feature-title">Capitanes Certificados</h3>
            <p className="why-feature-text">
              Más de 10 años de experiencia cada uno
            </p>
          </div>
          <div className="why-feature">
            <div className="why-icon">
              <span className="material-icons-round">support_agent</span>
            </div>
            <h3 className="why-feature-title">Servicio 24/7</h3>
            <p className="why-feature-text">
              Soporte completo antes, durante y después
            </p>
          </div>
          <div className="why-feature">
            <div className="why-icon">
              <span className="material-icons-round">security</span>
            </div>
            <h3 className="why-feature-title">Seguridad Total</h3>
            <p className="why-feature-text">
              Seguros completos y protocolos de seguridad
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
