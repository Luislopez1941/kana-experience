'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Users, 
  MapPin,
  CreditCard,
  CheckCircle,
  Phone,
  Mail,
  User,
  MessageCircle
} from 'lucide-react';
import './ReservationProcess.css';

interface ReservationStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'pending' | 'active' | 'completed';
}

const ReservationProcess: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 1,
    yachtId: 1,
    specialRequests: ''
  });

  const steps: ReservationStep[] = [
    {
      id: 1,
      title: 'Información Personal',
      description: 'Datos de contacto',
      icon: <User size={24} />,
      status: currentStep >= 1 ? 'active' : 'pending'
    },
    {
      id: 2,
      title: 'Detalles del Viaje',
      description: 'Fecha, hora y pasajeros',
      icon: <Calendar size={24} />,
      status: currentStep >= 2 ? 'active' : 'pending'
    },
    {
      id: 3,
      title: 'Confirmación',
      description: 'Revisar y confirmar',
      icon: <CheckCircle size={24} />,
      status: currentStep >= 3 ? 'active' : 'pending'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Aquí iría la lógica para enviar la reserva
    console.log('Reserva enviada:', formData);
    alert('¡Reserva enviada exitosamente!');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="reservation-process__step-content">
            <h3>Información Personal</h3>
            <p>Proporciona tus datos de contacto para continuar</p>
            
            <div className="reservation-process__form-group">
              <label>
                <User size={20} />
                Nombre completo
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Tu nombre completo"
                required
              />
            </div>

            <div className="reservation-process__form-group">
              <label>
                <Mail size={20} />
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="tu@email.com"
                required
              />
            </div>

            <div className="reservation-process__form-group">
              <label>
                <Phone size={20} />
                Teléfono
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+34 600 000 000"
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="reservation-process__step-content">
            <h3>Detalles del Viaje</h3>
            <p>Selecciona la fecha, hora y número de pasajeros</p>
            
            <div className="reservation-process__form-row">
              <div className="reservation-process__form-group">
                <label>
                  <Calendar size={20} />
                  Fecha del viaje
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="reservation-process__form-group">
                <label>
                  <Clock size={20} />
                  Hora de salida
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="reservation-process__form-group">
              <label>
                <Users size={20} />
                Número de pasajeros
              </label>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleInputChange}
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'persona' : 'personas'}
                  </option>
                ))}
              </select>
            </div>

            <div className="reservation-process__form-group">
              <label>
                <MapPin size={20} />
                Puerto de salida
              </label>
              <select
                name="departurePort"
                onChange={handleInputChange}
                required
              >
                <option value="">Selecciona un puerto</option>
                <option value="puerto-banus">Puerto Banús</option>
                <option value="puerto-marbella">Puerto de Marbella</option>
                <option value="puerto-estepona">Puerto de Estepona</option>
              </select>
            </div>

            <div className="reservation-process__form-group">
              <label>
                <MessageCircle size={20} />
                Solicitudes especiales
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                placeholder="Algún requerimiento especial..."
                rows={3}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="reservation-process__step-content">
            <h3>Confirmar Reserva</h3>
            <p>Revisa los detalles antes de confirmar</p>
            
            <div className="reservation-process__confirmation-card">
              <div className="reservation-process__confirmation-section">
                <h4>Información Personal</h4>
                <div className="reservation-process__confirmation-item">
                  <User size={16} />
                  <span>{formData.name}</span>
                </div>
                <div className="reservation-process__confirmation-item">
                  <Mail size={16} />
                  <span>{formData.email}</span>
                </div>
                <div className="reservation-process__confirmation-item">
                  <Phone size={16} />
                  <span>{formData.phone}</span>
                </div>
              </div>

              <div className="reservation-process__confirmation-section">
                <h4>Detalles del Viaje</h4>
                <div className="reservation-process__confirmation-item">
                  <Calendar size={16} />
                  <span>{formData.date}</span>
                </div>
                <div className="reservation-process__confirmation-item">
                  <Clock size={16} />
                  <span>{formData.time}</span>
                </div>
                <div className="reservation-process__confirmation-item">
                  <Users size={16} />
                  <span>{formData.guests} {formData.guests === 1 ? 'persona' : 'personas'}</span>
                </div>
              </div>

              {formData.specialRequests && (
                <div className="reservation-process__confirmation-section">
                  <h4>Solicitudes Especiales</h4>
                  <div className="reservation-process__confirmation-item">
                    <MessageCircle size={16} />
                    <span>{formData.specialRequests}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="reservation-process__payment-info">
              <h4>Información de Pago</h4>
              <div className="reservation-process__payment-methods">
                <div className="reservation-process__payment-method">
                  <CreditCard size={20} />
                  <span>Tarjeta de crédito/débito</span>
                </div>
                <div className="reservation-process__payment-method">
                  <CheckCircle size={20} />
                  <span>Pago seguro con SSL</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="reservation-process">
      {/* Header */}
      <div className="reservation-process__header">
        <div className="reservation-process__header-container">
          <button 
            onClick={() => router.back()}
            className="reservation-process__back-btn"
          >
            <ArrowLeft size={20} />
            Volver
          </button>

          <Link href="/consult-reservation" className="reservation-process__lookup-btn">
            <MessageCircle size={20} />
            Consultar Reserva
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="reservation-process__container">
        {/* Progress Steps */}
        <div className="reservation-process__progress-steps">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className={`reservation-process__step reservation-process__step--${step.status}`}
            >
              <div className="reservation-process__step-icon">
                {step.icon}
              </div>
              <div className="reservation-process__step-info">
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="reservation-process__step-container">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="reservation-process__navigation">
          {currentStep > 1 && (
            <button onClick={handleBack} className="reservation-process__btn-secondary">
              <ArrowLeft size={20} />
              Anterior
            </button>
          )}
          
          {currentStep < 3 ? (
            <button onClick={handleNext} className="reservation-process__btn-primary">
              Siguiente
              <ArrowLeft size={20} style={{ transform: 'rotate(180deg)' }} />
            </button>
          ) : (
            <button onClick={handleSubmit} className="reservation-process__btn-primary">
              <CheckCircle size={20} />
              Confirmar Reserva
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationProcess; 