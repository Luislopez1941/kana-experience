'use client'

import React, { useState } from "react";
import "./styles/Footer.css";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribe email:", email);
    setEmail("");
  };

  return (
    <>
      {/* CTA Section */}
      <section className="cta">
        <div className="cta-container">
          <h2 className="cta-title">¿Listo para tu próxima aventura?</h2>
          <p className="cta-description">
            Únete a nuestra lista VIP y recibe ofertas exclusivas del Caribe
            mexicano
          </p>

          <form onSubmit={handleSubscribe} className="cta-form">
            <input
              type="email"
              placeholder="Tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input cta-input"
              required
            />
            <button type="submit" className="btn btn-white cta-button">
              Suscribirse
            </button>
          </form>

          <div className="cta-contact">
            <div className="contact-item">
              <div className="contact-label">Llámanos</div>
              <div className="contact-value">+52 998 123 4567</div>
            </div>
            <div className="contact-item">
              <div className="contact-label">WhatsApp</div>
              <div className="contact-value">+52 998 765 4321</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <img src="/kana.png" alt="Kana Logo" className="footer-logo-img" />
           
              </div>
              <p className="footer-brand-text">
                Experiencias de lujo en el Caribe mexicano desde 2008
              </p>
              <div className="footer-social">
                <a href="#" className="social-link">
                  <span className="material-icons-round">facebook</span>
                </a>
                <a href="#" className="social-link">
                  <span className="material-icons-round">camera_alt</span>
                </a>
                <a href="#" className="social-link">
                  <span className="material-icons-round">video_library</span>
                </a>
              </div>
            </div>

            <div className="footer-section">
              <h4 className="footer-section-title">Servicios</h4>
              <ul className="footer-links">
                <li>
                  <a href="#" className="footer-link">
                    Alquiler de Yates
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Eventos Privados
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Bodas en el Mar
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Chárter Corporativo
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-section-title">Destinos</h4>
              <ul className="footer-links">
                <li>
                  <a href="#" className="footer-link">
                    Cancún & Isla Mujeres
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Playa del Carmen
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Los Cabos
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Puerto Vallarta
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-section-title">Contacto</h4>
              <div className="footer-contact">
                <div className="contact-info">
                  <span className="material-icons-round contact-icon">
                    phone
                  </span>
                  +52 998 123 4567
                </div>
                <div className="contact-info">
                  <span className="material-icons-round contact-icon">
                    email
                  </span>
                  info@luxeyacht.mx
                </div>
                <div className="contact-info">
                  <span className="material-icons-round contact-icon">
                    location_on
                  </span>
                  Marina Cancún, Quintana Roo
                </div>
                <div className="contact-info">
                  <span className="material-icons-round contact-icon">
                    schedule
                  </span>
                  24/7 Atención al Cliente
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 LuxeYacht México. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
};
