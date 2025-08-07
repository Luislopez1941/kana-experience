import React from "react";
import "./Loading.css";

interface LoadingProps {
  size?: "small" | "medium" | "large";
  text?: string;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({ 
  size = "medium", 
  text = "Cargando...", 
  className = "" 
}) => {
  return (
    <div className={`loading-container ${className}`}>
      <span className={`loader loader-${size}`}></span>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};

export default Loading;
