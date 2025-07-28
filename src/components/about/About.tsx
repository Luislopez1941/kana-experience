import React from "react";
import "./styles/About.css";

export const About: React.FC = () => {
  return (
    <section id="nosotros" className="about">
      <div className="about-container">
        <div className="about-grid">
          <div className="about-content">
            <h2 className="about-title">SOBRE NOSOTROS</h2>
            
            <p className="about-text">
              En VIBECUN no solo ofrecemos tours o servicios…
            </p>
            
            <p className="about-text">
              <strong>Creamos experiencias únicas</strong> en uno de los destinos más vibrantes del mundo: Cancún.
            </p>
            
            <p className="about-text">
              Somos una agencia especializada en experiencias exclusivas: yates, antros, jetski, tours y todo lo necesario para que vivas el viaje como siempre lo soñaste.
            </p>
            
            <p className="about-text">
              Nos mueve la vibra, la buena energía, los momentos épicos y sobre todo, el compromiso de que cada cliente se vaya con una historia que contar.
            </p>
            
            <p className="about-text">
              Sabemos lo que se necesita para hacer un día inolvidable:
            </p>
            
            <p className="about-text">
              <strong>servicio impecable, atención personalizada y una vibra que no se encuentra en otro lugar.</strong>
            </p>
            
            <p className="about-text">
              Y fotografías de nosotros, obviamente más profesionales o casuales (esto dara confianza de ver una cara humana)
            </p>
          </div>
          <div className="about-image">
            <div className="image-placeholder">
              <div className="image-overlay">
                <img src="/kana.png" alt="Kana Logo" className="overlay-logo" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
