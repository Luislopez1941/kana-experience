import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  text?: string;
  size?: 'small' | 'medium' | 'large';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  text = "Cargando", 
  size = 'medium' 
}) => {
  const sizeClasses = {
    small: '1.5rem',
    medium: '3rem',
    large: '4rem'
  };

  return (
    <div className="consult-reservation-loading">
      <div 
        className="consult-reservation-loading__spinner"
        style={{ 
          width: sizeClasses[size], 
          height: sizeClasses[size] 
        }}
      ></div>
      <div className="consult-reservation-loading__text">
        {text}
        <span className="consult-reservation-loading__dots"></span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
