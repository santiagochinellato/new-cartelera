import React, { useState, useEffect } from "react";
import type { Professional } from "../types";
import { cemmProfesionalesData } from "../data/cemmProfesionalesData";
import SingleCenter from "./SingleCenter";

const DualCenter: React.FC = () => {
  const [activeCenter, setActiveCenter] = useState<"cemm" | "endo">("cemm");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Filtrar profesionales por centro
  const cemmProfessionals = cemmProfesionalesData.filter(
    (prof: Professional) => prof.centro === "cemm" || prof.centro === "ambos"
  );

  const endoProfessionals = cemmProfesionalesData.filter(
    (prof: Professional) => prof.centro === "endo" || prof.centro === "ambos"
  );

  // Función para cambiar de centro con animación
  const switchCenter = () => {
    if (isTransitioning) return; // Evitar múltiples cambios simultáneos

    setIsTransitioning(true);

    // Después de la animación de fade out, cambiar el centro
    setTimeout(() => {
      setActiveCenter((prev) => (prev === "cemm" ? "endo" : "cemm"));

      // Después de cambiar, hacer fade in
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300); // Tiempo del fade in
    }, 300); // Tiempo del fade out
  };

  // Cambio automático cada 20 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      switchCenter();
    }, 20000); // 20 segundos

    return () => clearInterval(interval);
  }, [isTransitioning]); // Reiniciar el timer si hay una transición manual

  // Manejar clic en la pantalla para cambio manual
  const handleScreenClick = () => {
    switchCenter();
  };

  return (
    <div
      className="dual-center"
      onClick={handleScreenClick}
      style={{ cursor: "pointer" }}
    >
      {/* Indicador de centro activo */}
      {/* <div className="dual-center__indicator">
        <div
          className={`dual-center__indicator-dot ${
            activeCenter === "cemm" ? "active" : ""
          }`}
        >
          CEMM
        </div>
        <div
          className={`dual-center__indicator-dot ${
            activeCenter === "endo" ? "active" : ""
          }`}
        >
          Endo Bariloche
        </div>
      </div> */}

      {/* Contenido de la cartelera activa con animación */}
      <div
        className={`dual-center__content ${
          isTransitioning ? "dual-center__content--transitioning" : ""
        }`}
      >
        {activeCenter === "cemm" ? (
          <SingleCenter
            professionals={cemmProfessionals}
            centerName="cemm"
            centerTitle="CEMM"
          />
        ) : (
          <SingleCenter
            professionals={endoProfessionals}
            centerName="endo"
            centerTitle="Endo Bariloche"
          />
        )}
      </div>

      {/* Instrucción para el usuario */}
    </div>
  );

  /* CÓDIGO ANTERIOR COMENTADO - Sistema de tabs manual
  return (
    <div className="dual-center">
      <div className="dual-center__selector">
        <button
          className={`dual-center__tab ${
            activeCenter === "cemm" ? "dual-center__tab--active" : ""
          }`}
          onClick={() => setActiveCenter("cemm")}
        >
          <img
            src="/Cemm.png"
            alt="CEMM"
            className="dual-center__tab-logo"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
          <span>CEMM</span>
          <div className="dual-center__tab-count">
            {cemmProfessionals.length} profesionales
          </div>
        </button>

        <button
          className={`dual-center__tab ${
            activeCenter === "endo" ? "dual-center__tab--active" : ""
          }`}
          onClick={() => setActiveCenter("endo")}
        >
          <img
            src="/EndoBariloche.png"
            alt="Endo Bariloche"
            className="dual-center__tab-logo"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
          <span>Endo Bariloche</span>
          <div className="dual-center__tab-count">
            {endoProfessionals.length} profesionales
          </div>
        </button>
      </div>
      
      <div className="dual-center__content">
        {activeCenter === "cemm" ? (
          <SingleCenter
            professionals={cemmProfessionals}
            centerName="cemm"
            centerTitle="CEMM"
          />
        ) : (
          <SingleCenter
            professionals={endoProfessionals}
            centerName="endo"
            centerTitle="Endo Bariloche"
          />
        )}
      </div>
    </div>
  );
  */
};

export default DualCenter;
