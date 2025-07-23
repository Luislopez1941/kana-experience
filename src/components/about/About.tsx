import React from "react";
import "./styles/About.css";

export const About: React.FC = () => {
  return (
    <section id="nosotros" className="about">
      <div className="about-container">
        <div className="about-grid">
          <div className="about-content">
            <h2 className="about-title">
              Más de 15 años navegando
              <span className="about-subtitle">el Caribe Mexicano</span>
            </h2>
            <p className="about-text">
              Somos la empresa líder en alquiler de yates de lujo en México.
              Desde nuestros inicios en 2008, hemos navegado más de 100,000
              millas náuticas llevando a nuestros huéspedes a descubrir los
              tesoros ocultos del Caribe mexicano.
            </p>
            <p className="about-text">
              Nuestra pasión por el mar y compromiso con la excelencia nos ha
              convertido en la opción preferida de celebridades, ejecutivos y
              familias que buscan experiencias únicas e inolvidables.
            </p>
            <div className="about-stats">
              <div className="stat">
                <div className="stat-number">500+</div>
                <div className="stat-label">Clientes Felices</div>
              </div>
              <div className="stat">
                <div className="stat-number">25</div>
                <div className="stat-label">Yates de Lujo</div>
              </div>
              <div className="stat">
                <div className="stat-number">15</div>
                <div className="stat-label">Años de Experiencia</div>
              </div>
            </div>
          </div>
          <div className="about-image">
            <div className="image-placeholder">
              <span className="material-icons-round">sailing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
